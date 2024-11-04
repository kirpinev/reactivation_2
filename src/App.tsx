import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import money1 from "./assets/money1.jpg";
import money2 from "./assets/money2.jpg";
import money3 from "./assets/money3.jpg";
import money4 from "./assets/money4.jpg";
import { appSt } from "./style.css";

import { useEffect, useState } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { StatusBadge } from "@alfalab/core-components/status-badge";

const images = [
  { src: money1, isMoney: false, name: "money1" },
  { src: money2, isMoney: false, name: "money2" },
  { src: money3, isMoney: true, name: "money3" },
  { src: money4, isMoney: false, name: "money4" },
];

export const App = () => {
  const [initialImages, setInitialImages] = useState(images);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isGameStopped, setIsGameStopped] = useState(false);
  const [selected, setSelected] = useState<null | {
    isMoney: boolean;
    name: string;
    src: string;
  }>(null);

  useEffect(() => {
    if (selected !== null) {
      if (selected.isMoney) {
        setSuccess(true);
      } else {
        setError(true);
      }
    }
  }, [selected]);

  return (
    <>
      <Gap size={48} />
      <div className={appSt.container}>
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="small"
          weight="semibold"
          className={appSt.productsTitle}
        >
          {success
            ? "Поздравляем, вы выиграли приз!"
            : "На каких фото изображены деньги?"}
        </Typography.TitleResponsive>
        {!success && (
          <Typography.Text weight="regular" view="primary-medium">
            Угадайте и получите приз!
          </Typography.Text>
        )}

        <Gap size={32} />

        {success ? (
          <div
            style={{
              width: "60%",
              height: "150px",
              position: "relative",
              borderRadius: "16px",
            }}
          >
            <StatusBadge
              view="positive-checkmark"
              size={20}
              className={appSt.checkMark}
            />
            <img
              src={selected?.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: "16px",
              }}
            />
          </div>
        ) : (
          <div className={appSt.images}>
            {initialImages.map((image, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  flexBasis: "33%",
                  position: "relative",
                  borderRadius: "16px",
                }}
                onClick={() => {
                  if (!isGameStopped) {
                    setSelected(image);
                    setIsGameStopped(true);
                  }
                }}
              >
                {image.name === selected?.name && (
                  <StatusBadge
                    view="positive-checkmark"
                    size={20}
                    className={appSt.checkMark}
                  />
                )}
                {image.name === selected?.name && !selected?.isMoney && (
                  <StatusBadge
                    view="negative-cross"
                    size={20}
                    className={appSt.checkMark}
                  />
                )}
                <img
                  src={image.src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <Gap size={40} />

        {error && (
          <div style={{ textAlign: "center" }}>
            <Typography.Text
              weight="regular"
              color="negative"
              view="primary-large"
            >
              Близко, но нет. Попробуйте еще раз!
            </Typography.Text>
          </div>
        )}

        {success && (
          <>
            <Typography.Text weight="bold" view="primary-large">
              Приз!
            </Typography.Text>
            <Typography.Text weight="regular" view="primary-medium">
              До 80% кэшбэка в Яндекс.Маркете
            </Typography.Text>
          </>
        )}
      </div>

      <Gap size={40} />

      <div className={appSt.bottomBtnThx}>
        {success && (
          <ButtonMobile block view="primary" href="">
            Забрать приз
          </ButtonMobile>
        )}
        {error && (
          <ButtonMobile
            block
            view="primary"
            onClick={() => {
              setError(false);
              setSelected(null);
              setIsGameStopped(false);
              setInitialImages(initialImages.sort(() => 0.5 - Math.random()));
            }}
          >
            Сыграть еще
          </ButtonMobile>
        )}
      </div>
    </>
  );
};
