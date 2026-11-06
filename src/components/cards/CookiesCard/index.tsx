'use client';

import clsx from "clsx";
import { useState, type ReactNode } from "react";

export interface CookiesCardProps {
  /** Título do aviso (opcional). */
  title?: string;
  /** Descrição do item (opcional). */
  description?: ReactNode;
  /** Classes adicionais para customização. */
  containerClassName?: string;
  /** Classes adicionais para o título. */
  titleClassName?: string;
  /** Classes adicionais para a descrição. */
  descriptionClassName?: string;
  /**Título do botão de confirmação */
  buttonTitle?: string;
  /**Ação ao clicar no botão de confirmação */
  onConfirm?: () => void;
  /** Classes adicionais para o botão */
  buttonClassName?: string;
  /** Título do botão de recusa. Sem ele, o botão não aparece. */
  declineButtonTitle?: string;
  /** Ação ao clicar no botão de recusa */
  onDecline?: () => void;
  /** Classes adicionais para o botão de recusa */
  declineButtonClassName?: string;
}

export default function CookiesCard({
  title,
  description,
  containerClassName,
  titleClassName,
  descriptionClassName,
  buttonClassName,
  buttonTitle = "Entendi",
  onConfirm,
  declineButtonTitle,
  onDecline,
  declineButtonClassName,
}: CookiesCardProps) {
  const [showCard, setShowCard] = useState(true);

  const handleConfirm = () => {
    setShowCard(false);
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleDecline = () => {
    setShowCard(false);
    onDecline?.();
  };

  return (
    <div
      className={clsx(
        showCard
          ? "absolute bottom-0 left-0 w-full flex flex-col bg-background border-foreground border-t p-4 shadow-sm mx-auto"
          : "hidden",
        containerClassName
      )}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          {title && (
            <h3
              className={clsx(
                "text-base sm:text-lg font-semibold text-foreground",
                titleClassName
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={clsx(
                "text-sm sm:text-base text-foreground/70",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          {declineButtonTitle && (
            <button
              className={clsx(
                "flex min-w-0 flex-1 items-center justify-center rounded-md border border-foreground px-3 py-2 text-sm font-semibold text-foreground sm:w-40 sm:flex-none sm:text-base",
                declineButtonClassName
              )}
              onClick={handleDecline}
            >
              {declineButtonTitle}
            </button>
          )}
          <button
            className={clsx(
              "flex min-w-0 flex-1 items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-on-brand sm:w-40 sm:flex-none sm:text-base",
              buttonClassName
            )}
            onClick={handleConfirm}
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}


