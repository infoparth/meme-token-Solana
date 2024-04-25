import React, { useState, useEffect } from "react";
import balluimg from "../../assets/balluimg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./Home.css";
import * as web3 from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";
import { Buffer } from "buffer";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Loader2, Copy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from "../ui/textarea";

window.Buffer = window.Buffer || Buffer;

function Home() {
  const [_amount, set_Amount] = useState<string | undefined>("");
  const [amount, setAmount] = useState<number | undefined>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [_signature, set_Signature] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const rpcUrl = process.env.VITE_MAINNET_RPC_URL || "";

  const connection = new web3.Connection(rpcUrl);

  const { publicKey, sendTransaction, connected } = useWallet();
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

        set_Signature(signature);

        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature,
        });

        setIsLoading(false);

        toast({
          title: "Token sent successfully!",
          // description: `Tx signature ${signature}`,
          action: (
            <ToastAction altText="Copy" onClick={handleCopySignature}>
              Copy Signature
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Amount or Public Key not Found!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err) {
      console.error("Error Transferring: ", err);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Failed to send Tokens!",
      });
    }
  };

  const handleCopySignature = () => {
    window.navigator.clipboard.writeText(_signature);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_Amount(event.target.value);
    if (Number(event.target.value) > 0) {
      const inputValue = Number(event.target.value);
      setAmount(isNaN(inputValue) ? undefined : inputValue);
    } else setAmount(0);
  };

  useEffect(() => {
    if (connected) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }),
    [connected];

  return (
    <div className="bg-[#f6b74f] h-screen ">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2 text-center">
          <div className="left-container">
            <div className="bone-input-container">
              <div className="input-container-outer">
                <div className="input-container-inner">
                  <Label htmlFor="Number"> Enter amount in SOL</Label>
                  <Input
                    disabled={!isConnected}
                    type="text"
                    className="bg-transparent border-0 "
                    style={{
                      outline: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    value={_amount}
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
            {_signature !== "" && (
              <div className=" container">
                <Label
                  className="flex justify-start items-center"
                  htmlFor="message"
                >
                  Your Signature
                </Label>
                <div className="flex">
                  <Textarea
                    className=" mt-2 bg-transparent border-0"
                    id="message"
                    value={_signature}
                    disabled
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-transparent hover:bg-gray-500 active:bg-black border-0 hover:gray"
                    onClick={handleCopySignature}
                  >
                    <Copy className="h-4 w-4 " />
                  </Button>
                </div>
              </div>
            )}
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
