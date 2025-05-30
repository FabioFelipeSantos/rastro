import { type FC } from "react";

import * as S from "./styles";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal, modalInfo } from "../../store/reducers/modalSlice";

export const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, title, content } = useAppSelector(modalInfo);

  return (
    <>
      {isOpen ? (
        <S.ModalExternalContainer>
          <S.ModalOverlay onClick={() => dispatch(closeModal())} />

          <S.ModalContentContainer>
            <S.ModalTitle>{title}</S.ModalTitle>
            <S.ModalContent>{content}</S.ModalContent>
            <S.ModalFooter>
              <Button
                text="Fechar"
                onClick={() => dispatch(closeModal())}
              />
            </S.ModalFooter>
          </S.ModalContentContainer>
        </S.ModalExternalContainer>
      ) : null}
    </>
  );
};
