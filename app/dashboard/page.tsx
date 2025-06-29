import React from "react";
import { getSession } from "../lib/session";
import connectToDB from "@/backend/lib/connectToDB";
import { Subject } from "@/backend/models/SubjectandTopic";
import Webnav from "../components/Webnav";
import Link from "next/link";
import Button from "../components/button";
import Sidenav from "../components/Dashboard/Sidenav"

const DashboardPage = async () => {
  const session = await getSession();
 if (!session.user) {
  return (
    <div>
      <Webnav />
      <div className="flex items-center justify-center h-[80vh]">
        <div className="shadow-lg  h-1/2  flex flex-col justify-center items-center rounded-lg p-6 max-w-xl w-full text-center space-y-8">
          <h2 className="text-3xl font-semibold text-secondary">
            🔒 Access Denied
          </h2>
          <p className="text-lg">
            You must be logged in to access the 📊 dashboard.
          </p>
          <Link href="/login">
            <Button text="🔑 Go to Login" />
          </Link>
        </div>
      </div>
    </div>
  );
}



  // Connect and fetch all subjects


  return (
   <div>
   <Sidenav/>
   </div>
  );
};

export default DashboardPage;
