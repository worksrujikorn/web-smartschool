import { createContext, useContext } from 'react';
const AppContext = createContext();
// import CryptoJS from "crypto-js";
import { useEffect } from 'react';
import { useRouter } from 'next/router'
export const state = [];
export function AppWrapper({ children }) {
    const router = useRouter()
    useEffect(() => {


        const load = async () => {

            try {
                let data = await localStorage.getItem('LoginRole');
                let LoginToken = await localStorage.getItem('LoginToken');
                console.log('router.pathname', router.pathname);
                console.log('data', data, LoginToken);
                if (router.pathname != '/' && !LoginToken) {
                    await router.push("/")
                }
                // const message = "กขฃคฅ"
                // const hashDigest = CryptoJS.AES.encrypt(message, process.env.NEXT_PUBLIC_DD_ENV).toString();

                // const words = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_DD_ENV).toString(CryptoJS.enc.Utf8);
                // data = JSON.parse(words);


                if (LoginToken && data == 5) {
                    if (
                        !router.pathname.includes('/parent')
                    ) {
                        router.push("/parent/main_parent")
                    }

                }


                if (LoginToken && data == 4) {
                    if (
                        !router.pathname.includes('/student')
                    ) {
                        router.push("/student/main_student")
                    }

                }


                if (LoginToken && data == 3) {
                    if (
                        !router.pathname.includes('/teacher')
                    ) {
                        router.push("/teacher/main_teacher")
                    }

                }

            
                if (LoginToken && data == 1) {
                    if (
                        !router.pathname.includes('/admin')
                    ) {
                        router.push("/admin/main_admin")
                    }

                }


            } catch (error) {
                console.log(error)


            }


        };
        load()
    }, [children]);


    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}