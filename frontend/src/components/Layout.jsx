import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header className=" " />

        <main className=" w-full ">
          <div className="md:pt-15 ">
            <Outlet className="" />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
