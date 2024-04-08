import Link from "next/link"
import { RiBankLine } from "react-icons/ri";
export default function NavBar (){
    return (
        <div className="navbar  text-black ">
  <div className="navbar-start">
    <h1 className="btn btn-ghost text-2xl">D-BanK <RiBankLine /></h1>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-6">
    <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/accounts"}>Accounts</Link></li>
      <li><Link href={""}>Transactions</Link></li>
      <li><Link href={""}>Dashboard</Link></li>
    </ul>
  </div>
  
</div>
    )
}