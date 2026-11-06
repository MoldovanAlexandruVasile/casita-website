import "@fontsource-variable/plus-jakarta-sans";
import "./index.css";
import "./i18n";

import type { LegalDocumentKind } from "./legal/legalDocument";
import { mount } from "./mount";
import { LegalPage } from "./pages/LegalPage";

// privacy.html and terms.html say which document they are on <body data-kind>.
const kind = document.body.dataset.kind as LegalDocumentKind;

mount(<LegalPage kind={kind} />);
