import { Icon } from "@chakra-ui/react";
import React from "react";

// svg paths are from Eva, our icon pack: https://akveo.github.io/eva-icons/#/

export const ArrowForwardOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"
    />
  </Icon>
);

export const ArrowBackOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"
    />
  </Icon>
);

export const MoreVerticalOutlineIcon = (props: any): React.ReactElement => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Icon viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="5" r="2" fill="currentColor" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
  </Icon>
);

export const CloseOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
    />
  </Icon>
);

export const ChevronUpIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M18 15a1 1 0 0 1-.64-.23L12 10.29l-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.41l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .13 1.41A1 1 0 0 1 18 15z"
    />
  </Icon>
);

export const ChevronDownIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z"
    />
  </Icon>
);

export const BookIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M20.62 4.22a1 1 0 0 0-.84-.2L12 5.77 4.22 4A1 1 0 0 0 3 5v12.2a1 1 0 0 0 .78 1l8 1.8h.44l8-1.8a1 1 0 0 0 .78-1V5a1 1 0 0 0-.38-.78zM5 6.25l6 1.35v10.15L5 16.4zM19 16.4l-6 1.35V7.6l6-1.35z"
    />
  </Icon>
);

export const PlusOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
    />
  </Icon>
);

export const ColumnIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <rect
      x="45.5"
      y="79.5"
      width="67"
      height="19"
      transform="rotate(-90 45.5 79.5)"
      fill="#C4C4C4"
      fillOpacity="0.2"
      stroke="black"
      strokeDasharray="2 2"
    />
    <rect
      x="21.5"
      y="79.5"
      width="67"
      height="19"
      transform="rotate(-90 21.5 79.5)"
      fill="#C4C4C4"
      stroke="black"
      strokeDasharray="2 2"
    />
  </Icon>
);

export const QuestionIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <line x1="7" y1="51" x2="75" y2="51" stroke="#C4C4C4" strokeWidth="6" />
    <line x1="7" y1="60" x2="75" y2="60" stroke="#C4C4C4" strokeWidth="6" />
    <path
      d="M11.704 36.144C10.88 36.144 10.156 35.964 9.532 35.604C8.916 35.236 8.432 34.724 8.08 34.068C7.736 33.412 7.564 32.656 7.564 31.8C7.564 30.944 7.736 30.192 8.08 29.544C8.432 28.888 8.916 28.376 9.532 28.008C10.156 27.64 10.88 27.456 11.704 27.456C12.536 27.456 13.26 27.64 13.876 28.008C14.5 28.376 14.984 28.888 15.328 29.544C15.672 30.192 15.844 30.944 15.844 31.8C15.844 32.656 15.672 33.412 15.328 34.068C14.984 34.716 14.512 35.22 13.912 35.58L16.036 37.62H14.728L13.024 35.964C12.616 36.084 12.176 36.144 11.704 36.144ZM11.704 35.256C12.32 35.256 12.86 35.12 13.324 34.848C13.796 34.568 14.16 34.172 14.416 33.66C14.68 33.14 14.812 32.52 14.812 31.8C14.812 31.08 14.68 30.464 14.416 29.952C14.16 29.44 13.796 29.048 13.324 28.776C12.86 28.496 12.32 28.356 11.704 28.356C11.088 28.356 10.544 28.496 10.072 28.776C9.608 29.048 9.244 29.44 8.98 29.952C8.724 30.464 8.596 31.08 8.596 31.8C8.596 32.52 8.724 33.14 8.98 33.66C9.244 34.172 9.608 34.568 10.072 34.848C10.544 35.12 11.088 35.256 11.704 35.256ZM19.2639 36.144C18.5599 36.144 17.9999 35.932 17.5839 35.508C17.1679 35.076 16.9599 34.416 16.9599 33.528V30.048H17.9679V33.42C17.9679 34.66 18.4759 35.28 19.4919 35.28C20.0119 35.28 20.4399 35.096 20.7759 34.728C21.1199 34.352 21.2919 33.82 21.2919 33.132V30.048H22.2999V36H21.3879L21.3159 34.932C21.1319 35.308 20.8559 35.604 20.4879 35.82C20.1279 36.036 19.7199 36.144 19.2639 36.144ZM26.3951 36.144C25.8271 36.144 25.3231 36.016 24.8831 35.76C24.4431 35.496 24.0951 35.132 23.8391 34.668C23.5911 34.204 23.4671 33.656 23.4671 33.024C23.4671 32.4 23.5911 31.856 23.8391 31.392C24.0871 30.92 24.4311 30.556 24.8711 30.3C25.3191 30.036 25.8351 29.904 26.4191 29.904C26.9951 29.904 27.4911 30.036 27.9071 30.3C28.3311 30.556 28.6551 30.896 28.8791 31.32C29.1031 31.744 29.2151 32.2 29.2151 32.688C29.2151 32.776 29.2111 32.864 29.2031 32.952C29.2031 33.04 29.2031 33.14 29.2031 33.252H24.4631C24.4871 33.708 24.5911 34.088 24.7751 34.392C24.9671 34.688 25.2031 34.912 25.4831 35.064C25.7711 35.216 26.0751 35.292 26.3951 35.292C26.8111 35.292 27.1591 35.196 27.4391 35.004C27.7191 34.812 27.9231 34.552 28.0511 34.224H29.0471C28.8871 34.776 28.5791 35.236 28.1231 35.604C27.6751 35.964 27.0991 36.144 26.3951 36.144ZM26.3951 30.756C25.9151 30.756 25.4871 30.904 25.1111 31.2C24.7431 31.488 24.5311 31.912 24.4751 32.472H28.2191C28.1951 31.936 28.0111 31.516 27.6671 31.212C27.3231 30.908 26.8991 30.756 26.3951 30.756ZM32.5911 36.144C31.8791 36.144 31.2871 35.964 30.8151 35.604C30.3431 35.244 30.0671 34.756 29.9871 34.14H31.0191C31.0831 34.452 31.2471 34.724 31.5111 34.956C31.7831 35.18 32.1471 35.292 32.6031 35.292C33.0271 35.292 33.3391 35.204 33.5391 35.028C33.7391 34.844 33.8391 34.628 33.8391 34.38C33.8391 34.02 33.7071 33.78 33.4431 33.66C33.1871 33.54 32.8231 33.432 32.3511 33.336C32.0311 33.272 31.7111 33.18 31.3911 33.06C31.0711 32.94 30.8031 32.772 30.5871 32.556C30.3711 32.332 30.2631 32.04 30.2631 31.68C30.2631 31.16 30.4551 30.736 30.8391 30.408C31.2311 30.072 31.7591 29.904 32.4231 29.904C33.0551 29.904 33.5711 30.064 33.9711 30.384C34.3791 30.696 34.6151 31.144 34.6791 31.728H33.6831C33.6431 31.424 33.5111 31.188 33.2871 31.02C33.0711 30.844 32.7791 30.756 32.4111 30.756C32.0511 30.756 31.7711 30.832 31.5711 30.984C31.3791 31.136 31.2831 31.336 31.2831 31.584C31.2831 31.824 31.4071 32.012 31.6551 32.148C31.9111 32.284 32.2551 32.4 32.6871 32.496C33.0551 32.576 33.4031 32.676 33.7311 32.796C34.0671 32.908 34.3391 33.08 34.5471 33.312C34.7631 33.536 34.8711 33.864 34.8711 34.296C34.8791 34.832 34.6751 35.276 34.2591 35.628C33.8511 35.972 33.2951 36.144 32.5911 36.144ZM38.1536 36C37.6096 36 37.1816 35.868 36.8696 35.604C36.5576 35.34 36.4016 34.864 36.4016 34.176V30.9H35.3696V30.048H36.4016L36.5336 28.62H37.4096V30.048H39.1616V30.9H37.4096V34.176C37.4096 34.552 37.4856 34.808 37.6376 34.944C37.7896 35.072 38.0576 35.136 38.4416 35.136H39.0656V36H38.1536ZM40.8142 28.728C40.6142 28.728 40.4462 28.664 40.3102 28.536C40.1822 28.4 40.1182 28.232 40.1182 28.032C40.1182 27.84 40.1822 27.68 40.3102 27.552C40.4462 27.424 40.6142 27.36 40.8142 27.36C41.0062 27.36 41.1702 27.424 41.3062 27.552C41.4422 27.68 41.5102 27.84 41.5102 28.032C41.5102 28.232 41.4422 28.4 41.3062 28.536C41.1702 28.664 41.0062 28.728 40.8142 28.728ZM40.3102 36V30.048H41.3182V36H40.3102ZM45.5453 36.144C44.9853 36.144 44.4813 36.016 44.0333 35.76C43.5853 35.504 43.2293 35.144 42.9653 34.68C42.7093 34.208 42.5813 33.656 42.5813 33.024C42.5813 32.392 42.7133 31.844 42.9773 31.38C43.2413 30.908 43.5973 30.544 44.0453 30.288C44.5013 30.032 45.0093 29.904 45.5693 29.904C46.1293 29.904 46.6333 30.032 47.0813 30.288C47.5293 30.544 47.8813 30.908 48.1373 31.38C48.4013 31.844 48.5333 32.392 48.5333 33.024C48.5333 33.656 48.4013 34.208 48.1373 34.68C47.8733 35.144 47.5133 35.504 47.0573 35.76C46.6093 36.016 46.1053 36.144 45.5453 36.144ZM45.5453 35.28C45.8893 35.28 46.2093 35.196 46.5053 35.028C46.8013 34.86 47.0413 34.608 47.2253 34.272C47.4093 33.936 47.5013 33.52 47.5013 33.024C47.5013 32.528 47.4093 32.112 47.2253 31.776C47.0493 31.44 46.8133 31.188 46.5173 31.02C46.2213 30.852 45.9053 30.768 45.5693 30.768C45.2253 30.768 44.9053 30.852 44.6093 31.02C44.3133 31.188 44.0733 31.44 43.8893 31.776C43.7053 32.112 43.6133 32.528 43.6133 33.024C43.6133 33.52 43.7053 33.936 43.8893 34.272C44.0733 34.608 44.3093 34.86 44.5973 35.028C44.8933 35.196 45.2093 35.28 45.5453 35.28ZM49.6949 36V30.048H50.6069L50.6669 31.116C50.8589 30.74 51.1349 30.444 51.4949 30.228C51.8549 30.012 52.2629 29.904 52.7189 29.904C53.4229 29.904 53.9829 30.12 54.3989 30.552C54.8229 30.976 55.0349 31.632 55.0349 32.52V36H54.0269V32.628C54.0269 31.388 53.5149 30.768 52.4909 30.768C51.9789 30.768 51.5509 30.956 51.2069 31.332C50.8709 31.7 50.7029 32.228 50.7029 32.916V36H49.6949Z"
      fill="black"
    />
  </Icon>
);

export const TextIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <line x1="10" y1="38" x2="78" y2="38" stroke="#666666" strokeWidth="4" />
    <line x1="10" y1="47" x2="78" y2="47" stroke="#666666" strokeWidth="4" />
    <line x1="10" y1="56" x2="50" y2="56" stroke="#666666" strokeWidth="4" />
  </Icon>
);

export const ImageIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <path
      d="M58 27H30.5C29.0418 27.0016 27.6438 27.5816 26.6127 28.6127C25.5816 29.6438 25.0016 31.0418 25 32.5V54.5C25.0016 55.9582 25.5816 57.3562 26.6127 58.3873C27.6438 59.4184 29.0418 59.9984 30.5 60H58C59.4582 59.9984 60.8562 59.4184 61.8873 58.3873C62.9184 57.3562 63.4984 55.9582 63.5 54.5V32.5C63.4984 31.0418 62.9184 29.6438 61.8873 28.6127C60.8562 27.5816 59.4582 27.0016 58 27ZM51.125 32.5C51.9408 32.5 52.7384 32.7419 53.4167 33.1952C54.0951 33.6484 54.6238 34.2927 54.936 35.0464C55.2482 35.8002 55.3299 36.6296 55.1707 37.4297C55.0116 38.2299 54.6187 38.9649 54.0418 39.5418C53.4649 40.1187 52.7299 40.5116 51.9297 40.6707C51.1296 40.8299 50.3002 40.7482 49.5464 40.436C48.7927 40.1238 48.1484 39.5951 47.6952 38.9167C47.2419 38.2384 47 37.4408 47 36.625C47.0011 35.5313 47.4361 34.4828 48.2094 33.7094C48.9828 32.9361 50.0313 32.5011 51.125 32.5ZM30.5 57.25C29.7707 57.25 29.0712 56.9603 28.5555 56.4445C28.0397 55.9288 27.75 55.2293 27.75 54.5V48.688L35.9003 41.4435C36.6867 40.7461 37.7094 40.3747 38.76 40.4051C39.8106 40.4354 40.8102 40.8652 41.555 41.6068L47.1366 47.1764L37.063 57.25H30.5ZM60.75 54.5C60.75 55.2293 60.4603 55.9288 59.9445 56.4445C59.4288 56.9603 58.7293 57.25 58 57.25H40.9526L51.3871 46.8155C52.1259 46.1872 53.0634 45.8411 54.0332 45.8386C55.003 45.836 55.9423 46.1773 56.6843 46.8017L60.75 50.1894V54.5Z"
      fill="black"
    />
  </Icon>
);

export const MultipleChoiceIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <circle cx="14.5" cy="18.5" r="4.5" fill="#DBDFE2" />
    <circle cx="14.5" cy="35.5" r="4.5" fill="#666666" />
    <circle cx="14.5" cy="52.5" r="4.5" fill="#DBDFE2" />
    <circle cx="14.5" cy="69.5" r="4.5" fill="#DBDFE2" />
    <line x1="23" y1="35" x2="48" y2="35" stroke="#C4C4C4" strokeWidth="4" />
    <line x1="23" y1="52" x2="70" y2="52" stroke="#C4C4C4" strokeWidth="4" />
    <line x1="23" y1="70" x2="43" y2="70" stroke="#C4C4C4" strokeWidth="4" />
    <line x1="23" y1="18" x2="80" y2="18" stroke="#C4C4C4" strokeWidth="4" />
  </Icon>
);

export const MultiSelectIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <line x1="20" y1="35" x2="45" y2="35" stroke="#C4C4C4" strokeWidth="4" />
    <line x1="20" y1="52" x2="67" y2="52" stroke="#C4C4C4" strokeWidth="4" />
    <line x1="20" y1="70" x2="40" y2="70" stroke="#C4C4C4" strokeWidth="4" />
    <line x1="20" y1="18" x2="77" y2="18" stroke="#C4C4C4" strokeWidth="4" />
    <rect x="7" y="14" width="9" height="9" rx="2" fill="#DBDFE2" />
    <rect x="7" y="48" width="9" height="9" rx="2" fill="#DBDFE2" />
    <rect x="7" y="31" width="9" height="9" rx="2" fill="#666666" />
    <rect x="7" y="65" width="9" height="9" rx="2" fill="#666666" />
  </Icon>
);

export const ShortAnswerIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 88 88" boxSize="5em">
    <rect opacity="0.2" width="88" height="88" fill="#A1B4C7" />
    <rect x="10" y="36" width="68" height="16" fill="#666666" />
  </Icon>
);

export const SettingsOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.94 22h-1.89a1.68 1.68 0 0 1-1.68-1.68v-1.09a.34.34 0 0 0-.22-.29.38.38 0 0 0-.41 0l-.74.8a1.67 1.67 0 0 1-2.37 0L4.26 18.4a1.66 1.66 0 0 1-.5-1.19 1.72 1.72 0 0 1 .5-1.21l.74-.74a.34.34 0 0 0 0-.37c-.06-.15-.16-.26-.3-.26H3.68A1.69 1.69 0 0 1 2 12.94v-1.89a1.68 1.68 0 0 1 1.68-1.68h1.09a.34.34 0 0 0 .29-.22.38.38 0 0 0 0-.41L4.26 8a1.67 1.67 0 0 1 0-2.37L5.6 4.26a1.65 1.65 0 0 1 1.18-.5 1.72 1.72 0 0 1 1.22.5l.74.74a.34.34 0 0 0 .37 0c.15-.06.26-.16.26-.3V3.68A1.69 1.69 0 0 1 11.06 2H13a1.68 1.68 0 0 1 1.68 1.68v1.09a.34.34 0 0 0 .22.29.38.38 0 0 0 .41 0l.69-.8a1.67 1.67 0 0 1 2.37 0l1.37 1.34a1.67 1.67 0 0 1 .5 1.19 1.63 1.63 0 0 1-.5 1.21l-.74.74a.34.34 0 0 0 0 .37c.06.15.16.26.3.26h1.09A1.69 1.69 0 0 1 22 11.06V13a1.68 1.68 0 0 1-1.68 1.68h-1.09a.34.34 0 0 0-.29.22.34.34 0 0 0 0 .37l.77.77a1.67 1.67 0 0 1 0 2.37l-1.31 1.33a1.65 1.65 0 0 1-1.18.5 1.72 1.72 0 0 1-1.19-.5l-.77-.74a.34.34 0 0 0-.37 0c-.15.06-.26.16-.26.3v1.09A1.69 1.69 0 0 1 12.94 22zm-1.57-2h1.26v-.77a2.33 2.33 0 0 1 1.46-2.14 2.36 2.36 0 0 1 2.59.47l.54.54.88-.88-.54-.55a2.34 2.34 0 0 1-.48-2.56 2.33 2.33 0 0 1 2.14-1.45H20v-1.29h-.77a2.33 2.33 0 0 1-2.14-1.46 2.36 2.36 0 0 1 .47-2.59l.54-.54-.88-.88-.55.54a2.39 2.39 0 0 1-4-1.67V4h-1.3v.77a2.33 2.33 0 0 1-1.46 2.14 2.36 2.36 0 0 1-2.59-.47l-.54-.54-.88.88.54.55a2.39 2.39 0 0 1-1.67 4H4v1.26h.77a2.33 2.33 0 0 1 2.14 1.46 2.36 2.36 0 0 1-.47 2.59l-.54.54.88.88.55-.54a2.39 2.39 0 0 1 4 1.67z"
    />
    <path
      fill="currentColor"
      d="M12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"
    />
  </Icon>
);

export const AlertIcon = (): React.ReactElement => (
  <Icon color="red.500" boxSize="72px">
    <path
      fill="currentColor"
      d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66 3 3 0 0 0-.05-3.04zm-1.7 2.05a1.31 1.31 0 0 1-1.19.65H4.33a1.31 1.31 0 0 1-1.19-.65 1 1 0 0 1 0-1l7.68-12.73a1.48 1.48 0 0 1 2.36 0l7.67 12.72a1 1 0 0 1 .01 1.01z"
    />
    <circle fill="currentColor" cx="12" cy="16" r="1" />
    <path
      fill="currentColor"
      d="M12 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"
    />
  </Icon>
);

export const SearchOutlineIcon = (): React.ReactElement => (
  <Icon color="grey.300" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z"
    />
  </Icon>
);

export const FilterOptionsIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 9a3 3 0 0 0-2.82 2H3a1 1 0 0 0 0 2h13.18A3 3 0 1 0 19 9zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
    />
    <path
      fill="currentColor"
      d="M3 7h1.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2H9.82a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2zm4-2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
    />
    <path
      fill="currentColor"
      d="M21 17h-7.18a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2h5.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2zm-10 2a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
    />
  </Icon>
);

export const CheckmarkCircleOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
    />
    <path
      fill="currentColor"
      d="M14.7 8.39l-3.78 5-1.63-2.11a1 1 0 0 0-1.58 1.23l2.43 3.11a1 1 0 0 0 .79.38 1 1 0 0 0 .79-.39l4.57-6a1 1 0 1 0-1.6-1.22z"
    />
  </Icon>
);

export const CheckmarkCircleFillIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61l-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08 3.78-5a1 1 0 1 1 1.6 1.22z"
    />
  </Icon>
);

export const FunnelIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M13.9 22a1 1 0 0 1-.6-.2l-4-3.05a1 1 0 0 1-.39-.8v-3.27l-4.8-9.22A1 1 0 0 1 5 4h14a1 1 0 0 1 .86.49 1 1 0 0 1 0 1l-5 9.21V21a1 1 0 0 1-.55.9 1 1 0 0 1-.41.1zm-3-4.54l2 1.53v-4.55A1 1 0 0 1 13 14l4.3-8H6.64l4.13 8a1 1 0 0 1 .11.46z"
    />
  </Icon>
);
