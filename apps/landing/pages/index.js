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
const { getTranslations } = translations;

const Home = () => {
  const [modal, setModal] = useState({
    isOpenModal: false,
    info: { title: "", description: "" },
  });

  const pageContent = getTranslations();
  const {
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
    <div style={{ overflow: "hidden" }}>
      <ToastContainer theme="dark" />
      <Modal {...modal} closeModal={closeModal} />
      <NavBar
        sectionContent={{ cta: general?.cta, comingSoon: general?.comingSoon }}
        onClickModal={() => openModal(modalVariant.join)}
      />
      <div isOpenModal={modal?.isOpenModal} id={"window"}>
        <TopPage {...landing} general={general} openModal={openModal} />
        <Sections>
          <Code sectionContent={code} />
          <Features sectionContent={features} />
          <Slider sectionContent={code} />
          <LivePreview sectionContent={livePreview} />
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
  );
};

const Sections = styled.div``;

export default Home;
