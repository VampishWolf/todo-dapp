import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useWriteContract } from "wagmi"
import erc721Abi from "../../smart-contracts/ERC721-ABI.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const mintNft = () => {
  try {
    const { writeContract } = useWriteContract()
    const res = writeContract({
      abi: erc721Abi.abi,
      address: '0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46',
      functionName: 'mint',
    })
    console.log(res, 'minted')
  } catch (error) {
    console.error(error)
  }
}