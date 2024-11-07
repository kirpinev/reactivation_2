import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import money1 from "./assets/money1.jpg";
import money2 from "./assets/money2.jpg";
import money3 from "./assets/money3.jpg";
import money4 from "./assets/money4.jpg";
import read1 from "./assets/read1.jpeg";
import read2 from "./assets/read2.jpg";
import read3 from "./assets/read3.png";
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

  const clickSuccess = () => {
    window.gtag("event", "prize_page_view", {
      variant_name: "reactivation_2",
    });
  };

  const clickSubmit = () => {
    window.gtag("event", "prize_get_click", {
      variant_name: "reactivation_2",
    });
  };

  const clickInteraction = () => {
    window.gtag("event", "game_interaction", {
      variant_name: "reactivation_2",
    });
  };

  useEffect(() => {
    if (selected !== null) {
      if (selected.isMoney) {
        setSuccess(true);
        clickSuccess();
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
            : "Найдите фото с изображением денег и получите приз"}
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (!isGameStopped) {
                    clickInteraction();
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
                    minHeight: "105px",
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
              Кэшбэк у партнёров
            </Typography.Text>
            <Gap size={24} />
            <div className={appSt.gifts}>
              <div className={appSt.gift}>
                <div className={appSt.imageWrapper}>
                  <img src={read3} alt="" className={appSt.giftImage} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography.Text weight="regular" view="primary-large">
                      Литрес
                    </Typography.Text>
                    <Gap size={8} />
                    <Typography.Text
                      weight="regular"
                      view="primary-small"
                      color="secondary"
                    >
                      За оплату картой онлайн
                    </Typography.Text>
                  </div>

                  <Typography.Text weight="regular" view="primary-large">
                    20%
                  </Typography.Text>
                </div>
              </div>
              <div className={appSt.gift}>
                <div className={appSt.imageWrapper}>
                  <img src={read1} alt="" className={appSt.giftImage} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography.Text weight="regular" view="primary-large">
                      Читай Город
                    </Typography.Text>
                    <Gap size={8} />
                    <Typography.Text
                      weight="regular"
                      view="primary-small"
                      color="secondary"
                    >
                      За оплату картой онлайн
                    </Typography.Text>
                  </div>

                  <Typography.Text weight="regular" view="primary-large">
                    10%
                  </Typography.Text>
                </div>
              </div>
              <div className={appSt.gift}>
                <div className={appSt.imageWrapper}>
                  <img
                    src={read2}
                    alt=""
                    className={appSt.giftImage}
                    style={{ transform: "scale(1.1)" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography.Text weight="regular" view="primary-large">
                      Буквоед
                    </Typography.Text>
                    <Gap size={8} />
                    <Typography.Text
                      weight="regular"
                      view="primary-small"
                      color="secondary"
                    >
                      За оплату картой онлайн
                    </Typography.Text>
                  </div>

                  <Typography.Text weight="regular" view="primary-large">
                    10%
                  </Typography.Text>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtnThx}>
        {success && (
          <ButtonMobile block view="primary" href="https://alfa.me/cbpartner" onClick={clickSubmit}>
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
