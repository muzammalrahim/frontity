import React from "react";
import { Global, css } from "frontity";
import kelsonBoldWOFF from "../../fonts/KelsonSans-Bold.woff";
import kelsonBoldTTF from "../../fonts/KelsonSans-Bold.ttf";


import poppinsfontTTF from "../../fonts/poppins-fonts/webfonts/Poppins-Bold.ttf";
import poppinsfontWOFF from "../../fonts/poppins-fonts/webfonts/Poppins-Bold.woff";

import tielabsfontTTF from "../../fonts/tielabs-fonticon/tielabs-fonticon.ttf";
import tielabsfontWOFF from "../../fonts/tielabs-fonticon/tielabs-fonticon.woff";


const FontFace = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Kelson";
        src: url(${kelsonBoldWOFF}) format("woff"),
          url(${kelsonBoldTTF}) format("ttf");
        font-weight: 700;
        font-display: swap;
      }
      @font-face {
        font-family: "Poppins";
        src: url(${poppinsfontWOFF}) format("ttf");
        url(${poppinsfontTTF}) format("ttf");
        font-weight: 700;
        font-display: swap;
      }
      @font-face {
        font-family: "tiefonticon";
        src: url(${tielabsfontWOFF}) format("woff"),
          url(${tielabsfontTTF}) format("ttf");
      }
    `}
  />
);

export default FontFace;
