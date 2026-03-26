"use client";
import { useConnection,  } from "wagmi"
import AirdropForm from "./AirdropForm"
import { Wallet, Zap, Users, CheckCircle2 } from "lucide-react"

export default function HomeContent() {
    const { isConnected } = useConnection()
    return (

        <div>
            {isConnected ? (
                <div>
                    <AirdropForm />
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full">
                        {/* 主卡片 */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                            {/* 图标 */}
                            <div className="flex justify-center mb-8">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl">
                                    <Wallet className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            {/* 标题 */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                                欢迎使用 Tsender
                            </h1>

                            {/* 副标题 */}
                            <p className="text-xl text-slate-300 text-center mb-8">
                                一键启动多链 Token 空投
                            </p>

                            {/* 特性列表 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            高效批量转账
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            单笔交易完成大规模空投
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Users className="w-6 h-6 text-green-400 mt-1" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            多链支持
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            支持 7+ 条 EVM 兼容链
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            实时验证
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            自动检查余额和小数位
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Wallet className="w-6 h-6 text-purple-400 mt-1" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            数据保存
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            地址和金额自动本地保存
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 连接提示 */}
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                                <p className="text-white mb-2 font-medium">
                                    请连接你的钱包以开始空投
                                </p>
                                <p className="text-sm text-slate-300">
                                    点击右上角的钱包连接按钮，选择你的钱包提供商开始使用
                                </p>
                            </div>

                            {/* 底部信息 */}
                            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                                <p className="text-xs text-slate-500">
                                    支持的钱包：MetaMask • WalletConnect • Coinbase Wallet • 等
                                </p>
                            </div>
                        </div>

                        {/* 背景装饰 */}
                        <div className="absolute inset-0 -z-10 overflow-hidden">
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
}