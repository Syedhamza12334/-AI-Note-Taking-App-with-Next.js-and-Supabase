"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { toast } from "sonner";
import { LogOutUserAction } from "@/Action/user";

// import { logOutAction } from "@/actions/users";

function LogOutButton() {
//   const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

      const { errorMessage } = await LogOutUserAction();



    if (!errorMessage) {
      router.push(`/?toastType=logOut`);
    } else {
    //   toast({
    //     title: "Error",
    //     description: errorMessage,
    //     variant: "destructive",
    //   });
    
    toast.error("Something went wrong");
}

    setLoading(false);
  };

  return (
 
    <Button
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
