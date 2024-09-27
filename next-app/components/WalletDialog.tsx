'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"

export function WalletDialog() {
    const [account, setAccount] = useState<string | null>(null)

    const { connect, connectors, error } = useConnect()
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setAccount(accounts[0])
                console.log(account)

            } catch (error) {
                console.error("Error connecting to MetaMask", error)
            }
        } else {
            alert("MetaMask is not installed. Please install it to use this feature.")
        }
    }

    const disconnectMetaMask = () => {
        disconnect()
        setAccount(null)
    }

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' })
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                }
            }
        }
        checkConnection()
    }, [])

    if (isConnected) {
        return (
            <Button onClick={disconnectMetaMask} variant="destructive">Disconnect</Button>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Connect Wallet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connect Wallet</DialogTitle>
                    <DialogDescription>
                        Select your preferred wallet below
                    </DialogDescription>
                </DialogHeader>


                <Button onClick={connectMetaMask}>Metamask</Button>
                <Button>WalletConnect</Button>
            </DialogContent>
        </Dialog>
    )
}
