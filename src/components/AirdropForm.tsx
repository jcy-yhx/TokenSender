"use client";
import InputForm from "@/components/ui/InputField";
import { useState, useMemo } from "react";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { useChainId, useConfig, useConnection, useWriteContract } from "wagmi"
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
    const chainId = useChainId()
    const config = useConfig()
    const { address } = useConnection()

    const [tokenAddress, setTokenAddress] = useState("")
    const [recipientAddresses, setRecipientAddresses] = useState("")
    const [amounts, setAmounts] = useState("")
    const total:number = useMemo(() => {
        console.log("Calculating total amount...",calculateTotal(amounts))
        return calculateTotal(amounts)
    }, [amounts])

    const approveWrite = useWriteContract()
    const airdropWrite = useWriteContract()

    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("Unsupported chain")
            return 0;
        }
        
        const result = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [address , tSenderAddress as `0x${string}`]
        })
        return Number(result)
    }


    async function handleSubmit() {
        const tSenderAddress = chainsToTSender[chainId]["tsender"]
        const approvedAmount = await getApprovedAmount(tSenderAddress)
        console.log("Approved amount:", approvedAmount)
        if (approvedAmount < total) {
            // 使用 approve.mutateAsync 代替 writeContractAsync
            const approvalHash = await approveWrite.mutateAsync({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [tSenderAddress as `0x${string}`, BigInt(total)]
            })
            const approvalReceipt = await waitForTransactionReceipt(config,{
                hash: approvalHash,
            })
            console.log("Approval transaction receipt:", approvalReceipt)
        }

        await airdropWrite.mutateAsync({
            address: tSenderAddress as `0x${string}`,
            abi: tsenderAbi,
            functionName: 'airdropERC20',
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipientAddresses.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
        })
    }

    return(
        <div>
            <InputForm 
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={e => setTokenAddress(e.target.value)}
            />

            <InputForm 
                label="Recipient Address"
                placeholder="0x1234, 0x5678, 0x9abc..."
                value={recipientAddresses}
                onChange={e => setRecipientAddresses(e.target.value)}
                large={true}
            />

            <InputForm 
                label="Amount"
                placeholder="100, 200, 300..."
                value={amounts}
                onChange={e => setAmounts(e.target.value)}
                large={true}
            />

            <button
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                Submit
            </button>



        </div>
        
    )
}