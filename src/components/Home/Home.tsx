import React from "react";
import balluimg from "../../assets/balluimg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./Home.css";
import { useState } from "react";
import * as web3 from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";
import { Buffer } from "buffer";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

window.Buffer = window.Buffer || Buffer;

function Home() {
  const [amount, setAmount] = useState<number | undefined>(0);
  const [isLoading, setIsLoading] = useState(false);
  const rpcUrl =
    "https://devnet.helius-rpc.com/?api-key=86f4576b-580e-4561-ba28-4ee23271774b";

  const connection = new web3.Connection(rpcUrl);
  // const connection = useConnection();

  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();

  const sendSol = async () => {
    if (publicKey === null && !sendTransaction) {
      toast({ variant: "destructive", title: "Wallet not connected!" });
      return;
    }

    if (amount !== undefined && amount <= 0) {
      toast({
        variant: "destructive",
        title: "Amount should be greater than zero!",
      });
      return;
    }

    setIsLoading(true);

    try {
      const reciepnt = "zANukequEnDxdjyuuvN8cJwsGzfCjCKKUTEkMcPHSVZ";

      const recieverPubKey = new web3.PublicKey(reciepnt);

      if (amount !== undefined && publicKey !== null) {
        const transferAmount = amount * web3.LAMPORTS_PER_SOL;

        const ix = web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recieverPubKey,
          lamports: transferAmount,
        });

        const transaction = new web3.Transaction().add(ix);

        const signature = await sendTransaction(transaction, connection);

        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature,
        });

        setIsLoading(false);

        toast({
          title: "Token sent successfully!",
          description: `Tx signature ${signature}`,
        });
      } else {
        setIsLoading(false);
        toast({ title: "Amount or Public Key not Found!" });
      }
    } catch (err) {
      console.error("Error Transferring: ", err);
      setIsLoading(false);
      toast({ variant: "destructive", title: "Failed to send Tokens!" });
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 0) {
      const inputValue = Number(event.target.value);
      setAmount(isNaN(inputValue) ? undefined : inputValue);
    } else setAmount(0);
  };

  return (
    <div className="bg-[#f6b74f] h-screen ">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2 text-center">
          <div className="left-container">
            <div className="bone-input-container">
              <div className="input-container-outer">
                <div className="input-container-inner">
                  <Label htmlFor="Number">Amount in SOL</Label>
                  <Input
                    type="number"
                    className="bg-transparent border-0 "
                    style={{
                      outline: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    value={amount?.toString()}
                    onChange={handleAmountChange}
                  ></Input>
                </div>
              </div>
            </div>

            <div className="space-x-4 w-[100%]">
              <Button
                onClick={isLoading ? undefined : sendSol}
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  "Buy Now"
                )}
              </Button>
              <WalletMultiButton />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={balluimg}
            alt="Small dog wearing sweater and tie"
            className="rounded-lg shadow-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
