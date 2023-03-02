import { useState } from "react";
import styled from "styled-components";
import {
  NavBar,
  Code,
  Features,
  Slider,
  Questionnaire,
  Faqs,
  Footer,
  Modal,
  TopPage,
  CustomWork,
  LivePreview,
} from "components";
import { translations, modalVariant } from "utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { getTranslations, getMetaImage } = translations;

const Home = () => {
  const [modal, setModal] = useState({
    isOpenModal: false,
    info: { title: "", description: "" },
  });

  const metaInformation = getMetaImage();
  const { url, image } = metaInformation;
  const pageContent = getTranslations();
  const {
    meta: { title, description },
    landing,
    sections: { code, features, questionnaire, livePreview, faqs, customWork },
    general,
    contact,
  } = pageContent;

  const openModal = ({ info, apiRequest = false, props }) => {
    setModal({
      isOpenModal: true,
      apiRequest,
      template: info,
      info: contact[info],
      ...props,
    });
    document.body.style.overflowY = "hidden";
  };

  const closeModal = () => {
    setModal((prevState) => ({ ...prevState, isOpenModal: false }));
    document.body.style.overflowY = "auto";
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="neoadmin.neoco.dev" />
        <meta
          property="twitter:url"
          content="https://neoadmin.neoco.dev/es-ES/"
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="metaImage" />
      </Head>

      <div style={{ overflow: "hidden" }}>
        <ToastContainer theme="dark" />
        <Modal {...modal} closeModal={closeModal} />
        <NavBar
          sectionContent={{
            cta: general?.cta,
            comingSoon: general?.comingSoon,
          }}
          onClickModal={() => openModal(modalVariant.join)}
        />
        <div isOpenModal={modal?.isOpenModal} id={"window"}>
          <TopPage {...landing} general={general} openModal={openModal} />
          <Sections>
            <Code sectionContent={code} />
            <Features sectionContent={features} />
            <Slider sectionContent={code} />
            <Questionnaire sectionContent={questionnaire} general={general} />
            <Faqs sectionContent={faqs} />
            <CustomWork
              {...general}
              sectionContent={customWork}
              onClickModal={() => openModal(modalVariant.customWork)}
            />
          </Sections>
          <Footer
            {...general}
            onClickModal={() => openModal(modalVariant.questions)}
          />
        </div>
      </div>
    </>
  );
};

const Sections = styled.div``;

export default Home;
