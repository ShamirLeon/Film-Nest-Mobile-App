import { MovieContext } from "./MovieContext";

export default function MovieProvider({ children }: { children: React.ReactNode }) {

    return (
        <MovieContext.Provider value={''}>
            {children}
        </MovieContext.Provider>
    )
}