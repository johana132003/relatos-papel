import {replace, useLocation, useNavigate, useSearchParams} from "react-router-dom";

export function useBusquedaTienda() {
    const location = useLocation();
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    function actualizarBusqueda(valor)
    {
        const t = valor;
        const query = t? `?q=${encodeURIComponent(t)}` : "";
        if(location.pathname === "/tienda"){
            setSearchParams(t? {q:t} : {}, {replace: true});
            return;
        }
        navigate(`/tienda/${query}`);
    }

    return {actualizarBusqueda};
}