

const Footer = () => {
    return (
     <>
      <footer className="bg-slate-950 pt-16 pb-12 border-t border-gray-100 px-4">
        <div className="grid grid-cols-1 gap-4 mx-auto max-w-[1000px]">
            <div className="col-span-1 space-y-4">
                <h1 className="text-amber-500 font-medium text-2xl">Teddy Abera<span className="text-slate-600">Fur.</span></h1>
                <div className="mr-2">
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
                    </p>
                </div>
                <div className="flex space-x-5">
                    <a href="#" className="text-gray-400 hover:text-gray-500"><i
                            className="fa-brands fa-facebook-square"></i></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500"><i
                            className="fa-brands fa-instagram-square"></i></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500"><i
                            className="fa-brands fa-twitter-square"></i></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                        <i className="fa-brands fa-github-square"></i>
                    </a>
                </div>
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
                        <div className="mt-4 space-y-4">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Marketing</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Commerce</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Insights</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
                        <div className="mt-4 space-y-4">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Pricing</a>
                             <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Guides</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">API Status</a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
                        <div className="mt-4 space-y-4">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Marketing</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Commerce</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Insights</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
                        <div className="mt-4 space-y-4">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Pricing</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Guides</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">API Status</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div className="bg-slate-900 py-4 px-4">
        <div className="max-w-[1000px] w-full mx-auto flex items-center justify-between">
            <p className="text-white">&copy; MessayFur - All Right Reserved</p>
            <div>
                <img src="./images/TeleBirr-Logo.png" alt="methods" className="h-7"/>
            </div>
        </div>
    </div>
    </>
    )
}

export default Footer;