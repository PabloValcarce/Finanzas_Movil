import useAuth from "../../../utils/useAuth";

const useTransactionHomeLogic = () => {

  const { checkToken } = useAuth();



  const verifyToken = async () => {
    await checkToken();  // Verificamos el token cuando la pantalla se carga
  };

  useEffect(() => {
    // Llamamos a checkToken al montar la pantalla
    verifyToken();
  }, []);


  return { /* tu lógica y valores */ };
};

export default useTransactionHomeLogic; // Exportación por defecto
