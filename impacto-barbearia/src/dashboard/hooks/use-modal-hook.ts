import { useState } from "react";

const useModal = () => {
    const [estaAberto, setEstaAberto] = useState(false);

    const gerenciarModal = () => {
        setEstaAberto(!estaAberto);
    }

    return {
        estaAberto,
        gerenciarModal
    }
}

export default useModal;