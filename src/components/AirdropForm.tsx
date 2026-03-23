"use client";

import InputForm from "@/components/ui/InputField";
import { useState, useMemo, useEffect } from "react";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import {
  useChainId,
  useConfig,
  useConnection,
  useWriteContract,
  useReadContracts,
} from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";
import { Loader2 } from "lucide-react";
import { formatUnits } from "viem";
import toast from "react-hot-toast";

export default function AirdropForm() {
  const chainId = useChainId();
  const config = useConfig();
  const { address } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddresses, setRecipientAddresses] = useState("");
  const [amounts, setAmounts] = useState("");

  const total: bigint = useMemo(() => {
    return calculateTotal(amounts);
  }, [amounts]);

  const [isLoading, setIsLoading] = useState(false);
  const approveWrite = useWriteContract();
  const airdropWrite = useWriteContract();

  // --- 持久化逻辑 ---
  useEffect(() => {
    const savedToken = localStorage.getItem("airdrop_tokenAddress");
    const savedRecipients = localStorage.getItem("airdrop_recipients");
    const savedAmounts = localStorage.getItem("airdrop_amounts");
    if (savedToken) setTokenAddress(savedToken);
    if (savedRecipients) setRecipientAddresses(savedRecipients);
    if (savedAmounts) setAmounts(savedAmounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("airdrop_tokenAddress", tokenAddress);
    localStorage.setItem("airdrop_recipients", recipientAddresses);
    localStorage.setItem("airdrop_amounts", amounts);
  }, [tokenAddress, recipientAddresses, amounts]);

  // --- 读取代币信息 ---
  const {
    data: tokenData,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useReadContracts({
    contracts: tokenAddress?.match(/^0x[a-fA-F0-9]{40}$/)
      ? [
          {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "decimals",
          },
          {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "name",
          },
          {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "balanceOf",
            args: [address],
          },
        ]
      : [],
  });

  const amountToken = useMemo(() => {
    if (!tokenData || !tokenData[0]?.result) return "0";
    const decimals = Number(tokenData[0].result);
    return formatUnits(BigInt(total), decimals);
  }, [tokenData, total]);

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<bigint> {
    if (!tSenderAddress) {
      toast.error("不支持的链");
      return 0n;
    }
    const result = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [address, tSenderAddress as `0x${string}`],
    });
    return result as bigint;
  }

  async function handleSubmit() {
    if (!validateInputs()) return;
    if (isLoading) return;
    setIsLoading(true);

    try {
      const tSenderAddress = chainsToTSender[chainId]["tsender"];
      if (!tSenderAddress) {
        toast.error("不支持的链");
        return;
      }

      const approvedAmount = await getApprovedAmount(tSenderAddress);
      if (approvedAmount < total) {
        const approvalHash = await approveWrite.mutateAsync({
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [tSenderAddress as `0x${string}`, total],
        });
        await waitForTransactionReceipt(config, { hash: approvalHash });
      }

      const airdropHash = await airdropWrite.mutateAsync({
        address: tSenderAddress as `0x${string}`,
        abi: tsenderAbi,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          recipientAddresses
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amounts
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          total,
        ],
      });
      await waitForTransactionReceipt(config, { hash: airdropHash });
      toast.success("空投交易已提交！请检查您的钱包以确认。");
    } catch (error) {
      console.error("空投过程中发生错误:", error);
      toast.error(
        "发生错误: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsLoading(false);
    }
  }

  function validateInputs() {
    const addresses = recipientAddresses
      .split(/[,\n]+/)
      .map((addr) => addr.trim())
      .filter((addr) => addr !== "");
    const amountsList = amounts
      .split(/[,\n]+/)
      .map((amt) => amt.trim())
      .filter((amt) => amt !== "");

    if (addresses.length === 0 || amountsList.length === 0) {
      toast.error("请输入地址和金额");
      return false;
    }
    if (addresses.length !== amountsList.length) {
      toast.error(
        `地址数量 (${addresses.length}) 与金额数量 (${amountsList.length}) 不匹配`
      );
      return false;
    }
    const invalidAmounts = amountsList.filter((amt) => {
      const num = Number(amt);
      return isNaN(num) || num <= 0;
    });
    if (invalidAmounts.length > 0) {
      toast.error("以下金额无效（必须是正数）：\n" + invalidAmounts.join(", "));
      return false;
    }
    return true;
  }

  // 解析地址和金额数量用于步骤指示
  const addressCount = recipientAddresses
    .split(/[,\n]+/)
    .map((a) => a.trim())
    .filter((a) => a !== "").length;
  const amountCount = amounts
    .split(/[,\n]+/)
    .map((a) => a.trim())
    .filter((a) => a !== "").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-start justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            批量空投工具
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            高效分发 ERC-20 代币至多个地址
          </p>
        </div>

        {/* Step 1 — Token Address */}
        <section className="rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm p-5 sm:p-6 space-y-3 transition-shadow hover:shadow-lg hover:shadow-gray-300/20">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold ring-1 ring-emerald-500/30">
              1
            </span>
            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              代币合约地址
            </h2>
          </div>
          <InputForm
            label=""
            placeholder="0x..."
            value={tokenAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTokenAddress(e.target.value)}
          />
        </section>

        {/* Token Info Panel */}
        {tokenAddress?.match(/^0x[a-fA-F0-9]{40}$/) && (
          <section className="rounded-2xl border border-gray-300 bg-white/60 p-5 sm:p-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {isTokenLoading && (
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                读取链上信息中…
              </div>
            )}
            {isTokenError && (
              <p className="text-sm text-red-400">
                ⚠️ 无法获取代币信息，请检查合约地址
              </p>
            )}
            {!isTokenLoading && !isTokenError && tokenData && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "代币名称",
                    value: String(tokenData[1]?.result ?? "—"),
                  },
                  {
                    label: "精度",
                    value: String(tokenData[0]?.result ?? "—"),
                  },
                  {
                    label: "你的余额",
                    value: tokenData[2]?.result
                      ? tokenData[2].result.toString()
                      : "0",
                  },
                  {
                    label: "本次发送",
                    value: `${amountToken} ${String(
                      tokenData[1]?.result ?? ""
                    )}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-gray-100/50 border border-gray-200/50 p-3 space-y-1"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Step 2 — Recipients */}
        <section className="rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm p-5 sm:p-6 space-y-3 transition-shadow hover:shadow-lg hover:shadow-gray-300/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold ring-1 ring-emerald-500/30">
                2
              </span>
              <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                接收者地址
              </h2>
            </div>
            {addressCount > 0 && (
              <span className="text-xs text-gray-500 tabular-nums">
                {addressCount} 个地址
              </span>
            )}
          </div>
          <InputForm
            label=""
            placeholder="每行一个地址，或用逗号分隔"
            value={recipientAddresses}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setRecipientAddresses(e.target.value)}
            large={true}
          />
        </section>

        {/* Step 3 — Amounts */}
        <section className="rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm p-5 sm:p-6 space-y-3 transition-shadow hover:shadow-lg hover:shadow-gray-300/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold ring-1 ring-emerald-500/30">
                3
              </span>
              <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                发送数量
              </h2>
            </div>
            {amountCount > 0 && (
              <span className="text-xs text-gray-500 tabular-nums">
                {amountCount} 笔
              </span>
            )}
          </div>
          <InputForm
            label=""
            placeholder="每行一个数量，或用逗号分隔"
            value={amounts}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAmounts(e.target.value)}
            large={true}
          />
        </section>

        {/* Mismatch warning */}
        {addressCount > 0 &&
          amountCount > 0 &&
          addressCount !== amountCount && (
            <p className="text-sm text-red-400 text-center">
              ⚠️ 地址数量 ({addressCount}) 与金额数量 ({amountCount}) 不匹配
            </p>
          )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-12 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200
            bg-emerald-500 text-white hover:bg-emerald-400 active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
            flex items-center justify-center gap-2
            shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              处理中…
            </>
          ) : (
            "确认并分发"
          )}
        </button>
      </div>
    </div>
  );
}
