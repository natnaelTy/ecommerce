


const SignUp = () => {

    return (  
       <div className="flex items-center justify-center w-full h-screen">
           <div className="w-7xl h-screen relative bg-gray-100">
               <img src="./images/signuppage.png" alt="sign up" className="w-full h-full object-cover"/>
           </div>

           {/* form */}
           <div className="flex flex-col items-center gap-6 justify-center p-6 w-full h-screen">
            <h1 className="text-2xl font-medium md:text-3xl">Create your account</h1>
            <form className="flex flex-col w-full">
                <label htmlFor="fullname">Full Name <span className="text-red-600">*</span></label>
                <input type="name" placeholder="Full Name" className="px-4 py-2 outline-none bg-gray-100 w-full" required/><br />

                <label htmlFor="email">Email *</label>
                <input type="email" placeholder="Email" className="px-4 py-2 outline-none bg-gray-100 w-full" required/><br />

                <label htmlFor="password">Password *</label>
                <input type="password" placeholder="Password" className="px-4 py-2 outline-none bg-gray-100 w-full" required/>
            </form>
           </div>
       </div>
    );
}
 
export default SignUp;