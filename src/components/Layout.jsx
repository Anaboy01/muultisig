import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-between bg-stone-950">
      <nav className="w-full h-20 flex justify-between items-center px-4 border-b border-[#7fefe2] bg-stone-950 rounded-e-lg">
        <h3 className="text-lg font-medium text-[#0cc2ff]">Decisions</h3>
        <appkit-button />
      </nav>
      <section className="flex-1 p-8">
            {children}
      </section>
      <footer className="w-full h-20 flex justify-center items-center bg-zinc-700">
      <p className="text-stone-300">Decisions &copy; 2024. All Right Reserved</p>
      </footer>
      <ToastContainer theme="dark" position="bottom-right"/>
    </main>
  );
};

export default Layout;
