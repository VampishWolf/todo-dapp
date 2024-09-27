

import { WalletDialog } from "./WalletDialog";

// Add this at the top of your file or in a separate type declaration file
declare global {
    interface Window {
        ethereum: any;
    }
}

function Header() {

    return (
        <div className="p-2 flex items-center justify-end text-black">
            <WalletDialog />
        </div>
    )
}

export default Header