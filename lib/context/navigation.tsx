"use client"

import {createContext, useState, useContext} from "react"

interface NavigationContextType {
    isMobileNavOpen : boolean;
    setIsMobileNavOpen : (open : boolean ) => void ;
    closeMobileNav : () => void;
}

//création du contexte
const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
) //par défaut le contexte n'a pas de valeur définie

//provider qui fournit le contexte à ses enfants
export function NavigationProvider ({children} : { children : React.ReactNode}) {
    const [isMobileNavOpen , setIsMobileNavOpen] = useState(false)
    const closeMobileNav = () => setIsMobileNavOpen(false)

    return (
        <NavigationContext value={{ isMobileNavOpen, setIsMobileNavOpen, closeMobileNav }} >
            {children}
        </NavigationContext>
    )
}

//un hook qui consomme le contexte et le stocke dans une variable
export function useNavigation () {
    const context = useContext(NavigationContext) 
        if (context === undefined) {
            throw new Error ("useNavigation must be used within a NavigationProvider")
    }
    return context
}