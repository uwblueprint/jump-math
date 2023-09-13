import React from "react";
import type { IconProps } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

// svg paths are from Eva, our icon pack: https://akveo.github.io/eva-icons/#/

export const ArrowForwardOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"
      fill="currentColor"
    />
  </Icon>
);

export const ArrowBackOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"
      fill="currentColor"
    />
  </Icon>
);

export const MoreVerticalOutlineIcon = (
  props: IconProps,
): React.ReactElement => (
  <Icon viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" fill="currentColor" r="2" />
    <circle cx="12" cy="5" fill="currentColor" r="2" />
    <circle cx="12" cy="19" fill="currentColor" r="2" />
  </Icon>
);

export const CloseOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
      fill="currentColor"
    />
  </Icon>
);

export const ChevronUpIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M18 15a1 1 0 0 1-.64-.23L12 10.29l-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.41l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .13 1.41A1 1 0 0 1 18 15z"
      fill="currentColor"
    />
  </Icon>
);

export const ChevronDownIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z"
      fill="currentColor"
    />
  </Icon>
);

export const ChevronRightIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"
      fill="currentColor"
    />
  </Icon>
);

export const BookIcon = (props: IconProps): React.ReactElement => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#clip0_46_2452)">
      <path
        d="M19 3H7C6.20435 3 5.44129 3.31607 4.87868 3.87868C4.31607 4.44129 4 5.20435 4 6V18C4 18.7956 4.31607 19.5587 4.87868 20.1213C5.44129 20.6839 6.20435 21 7 21H19C19.2652 21 19.5196 20.8946 19.7071 20.7071C19.8946 20.5196 20 20.2652 20 20V4C20 3.73478 19.8946 3.48043 19.7071 3.29289C19.5196 3.10536 19.2652 3 19 3ZM7 19C6.73478 19 6.48043 18.8946 6.29289 18.7071C6.10536 18.5196 6 18.2652 6 18C6 17.7348 6.10536 17.4804 6.29289 17.2929C6.48043 17.1054 6.73478 17 7 17H18V19H7Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_46_2452">
        <rect fill="white" height="24" width="24" />
      </clipPath>
    </defs>
  </Icon>
);

export const PlusOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
      fill="currentColor"
    />
  </Icon>
);

export const QuestionIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <line stroke="#C4C4C4" strokeWidth="6" x1="7" x2="75" y1="51" y2="51" />
    <line stroke="#C4C4C4" strokeWidth="6" x1="7" x2="75" y1="60" y2="60" />
    <path
      d="M11.704 36.144C10.88 36.144 10.156 35.964 9.532 35.604C8.916 35.236 8.432 34.724 8.08 34.068C7.736 33.412 7.564 32.656 7.564 31.8C7.564 30.944 7.736 30.192 8.08 29.544C8.432 28.888 8.916 28.376 9.532 28.008C10.156 27.64 10.88 27.456 11.704 27.456C12.536 27.456 13.26 27.64 13.876 28.008C14.5 28.376 14.984 28.888 15.328 29.544C15.672 30.192 15.844 30.944 15.844 31.8C15.844 32.656 15.672 33.412 15.328 34.068C14.984 34.716 14.512 35.22 13.912 35.58L16.036 37.62H14.728L13.024 35.964C12.616 36.084 12.176 36.144 11.704 36.144ZM11.704 35.256C12.32 35.256 12.86 35.12 13.324 34.848C13.796 34.568 14.16 34.172 14.416 33.66C14.68 33.14 14.812 32.52 14.812 31.8C14.812 31.08 14.68 30.464 14.416 29.952C14.16 29.44 13.796 29.048 13.324 28.776C12.86 28.496 12.32 28.356 11.704 28.356C11.088 28.356 10.544 28.496 10.072 28.776C9.608 29.048 9.244 29.44 8.98 29.952C8.724 30.464 8.596 31.08 8.596 31.8C8.596 32.52 8.724 33.14 8.98 33.66C9.244 34.172 9.608 34.568 10.072 34.848C10.544 35.12 11.088 35.256 11.704 35.256ZM19.2639 36.144C18.5599 36.144 17.9999 35.932 17.5839 35.508C17.1679 35.076 16.9599 34.416 16.9599 33.528V30.048H17.9679V33.42C17.9679 34.66 18.4759 35.28 19.4919 35.28C20.0119 35.28 20.4399 35.096 20.7759 34.728C21.1199 34.352 21.2919 33.82 21.2919 33.132V30.048H22.2999V36H21.3879L21.3159 34.932C21.1319 35.308 20.8559 35.604 20.4879 35.82C20.1279 36.036 19.7199 36.144 19.2639 36.144ZM26.3951 36.144C25.8271 36.144 25.3231 36.016 24.8831 35.76C24.4431 35.496 24.0951 35.132 23.8391 34.668C23.5911 34.204 23.4671 33.656 23.4671 33.024C23.4671 32.4 23.5911 31.856 23.8391 31.392C24.0871 30.92 24.4311 30.556 24.8711 30.3C25.3191 30.036 25.8351 29.904 26.4191 29.904C26.9951 29.904 27.4911 30.036 27.9071 30.3C28.3311 30.556 28.6551 30.896 28.8791 31.32C29.1031 31.744 29.2151 32.2 29.2151 32.688C29.2151 32.776 29.2111 32.864 29.2031 32.952C29.2031 33.04 29.2031 33.14 29.2031 33.252H24.4631C24.4871 33.708 24.5911 34.088 24.7751 34.392C24.9671 34.688 25.2031 34.912 25.4831 35.064C25.7711 35.216 26.0751 35.292 26.3951 35.292C26.8111 35.292 27.1591 35.196 27.4391 35.004C27.7191 34.812 27.9231 34.552 28.0511 34.224H29.0471C28.8871 34.776 28.5791 35.236 28.1231 35.604C27.6751 35.964 27.0991 36.144 26.3951 36.144ZM26.3951 30.756C25.9151 30.756 25.4871 30.904 25.1111 31.2C24.7431 31.488 24.5311 31.912 24.4751 32.472H28.2191C28.1951 31.936 28.0111 31.516 27.6671 31.212C27.3231 30.908 26.8991 30.756 26.3951 30.756ZM32.5911 36.144C31.8791 36.144 31.2871 35.964 30.8151 35.604C30.3431 35.244 30.0671 34.756 29.9871 34.14H31.0191C31.0831 34.452 31.2471 34.724 31.5111 34.956C31.7831 35.18 32.1471 35.292 32.6031 35.292C33.0271 35.292 33.3391 35.204 33.5391 35.028C33.7391 34.844 33.8391 34.628 33.8391 34.38C33.8391 34.02 33.7071 33.78 33.4431 33.66C33.1871 33.54 32.8231 33.432 32.3511 33.336C32.0311 33.272 31.7111 33.18 31.3911 33.06C31.0711 32.94 30.8031 32.772 30.5871 32.556C30.3711 32.332 30.2631 32.04 30.2631 31.68C30.2631 31.16 30.4551 30.736 30.8391 30.408C31.2311 30.072 31.7591 29.904 32.4231 29.904C33.0551 29.904 33.5711 30.064 33.9711 30.384C34.3791 30.696 34.6151 31.144 34.6791 31.728H33.6831C33.6431 31.424 33.5111 31.188 33.2871 31.02C33.0711 30.844 32.7791 30.756 32.4111 30.756C32.0511 30.756 31.7711 30.832 31.5711 30.984C31.3791 31.136 31.2831 31.336 31.2831 31.584C31.2831 31.824 31.4071 32.012 31.6551 32.148C31.9111 32.284 32.2551 32.4 32.6871 32.496C33.0551 32.576 33.4031 32.676 33.7311 32.796C34.0671 32.908 34.3391 33.08 34.5471 33.312C34.7631 33.536 34.8711 33.864 34.8711 34.296C34.8791 34.832 34.6751 35.276 34.2591 35.628C33.8511 35.972 33.2951 36.144 32.5911 36.144ZM38.1536 36C37.6096 36 37.1816 35.868 36.8696 35.604C36.5576 35.34 36.4016 34.864 36.4016 34.176V30.9H35.3696V30.048H36.4016L36.5336 28.62H37.4096V30.048H39.1616V30.9H37.4096V34.176C37.4096 34.552 37.4856 34.808 37.6376 34.944C37.7896 35.072 38.0576 35.136 38.4416 35.136H39.0656V36H38.1536ZM40.8142 28.728C40.6142 28.728 40.4462 28.664 40.3102 28.536C40.1822 28.4 40.1182 28.232 40.1182 28.032C40.1182 27.84 40.1822 27.68 40.3102 27.552C40.4462 27.424 40.6142 27.36 40.8142 27.36C41.0062 27.36 41.1702 27.424 41.3062 27.552C41.4422 27.68 41.5102 27.84 41.5102 28.032C41.5102 28.232 41.4422 28.4 41.3062 28.536C41.1702 28.664 41.0062 28.728 40.8142 28.728ZM40.3102 36V30.048H41.3182V36H40.3102ZM45.5453 36.144C44.9853 36.144 44.4813 36.016 44.0333 35.76C43.5853 35.504 43.2293 35.144 42.9653 34.68C42.7093 34.208 42.5813 33.656 42.5813 33.024C42.5813 32.392 42.7133 31.844 42.9773 31.38C43.2413 30.908 43.5973 30.544 44.0453 30.288C44.5013 30.032 45.0093 29.904 45.5693 29.904C46.1293 29.904 46.6333 30.032 47.0813 30.288C47.5293 30.544 47.8813 30.908 48.1373 31.38C48.4013 31.844 48.5333 32.392 48.5333 33.024C48.5333 33.656 48.4013 34.208 48.1373 34.68C47.8733 35.144 47.5133 35.504 47.0573 35.76C46.6093 36.016 46.1053 36.144 45.5453 36.144ZM45.5453 35.28C45.8893 35.28 46.2093 35.196 46.5053 35.028C46.8013 34.86 47.0413 34.608 47.2253 34.272C47.4093 33.936 47.5013 33.52 47.5013 33.024C47.5013 32.528 47.4093 32.112 47.2253 31.776C47.0493 31.44 46.8133 31.188 46.5173 31.02C46.2213 30.852 45.9053 30.768 45.5693 30.768C45.2253 30.768 44.9053 30.852 44.6093 31.02C44.3133 31.188 44.0733 31.44 43.8893 31.776C43.7053 32.112 43.6133 32.528 43.6133 33.024C43.6133 33.52 43.7053 33.936 43.8893 34.272C44.0733 34.608 44.3093 34.86 44.5973 35.028C44.8933 35.196 45.2093 35.28 45.5453 35.28ZM49.6949 36V30.048H50.6069L50.6669 31.116C50.8589 30.74 51.1349 30.444 51.4949 30.228C51.8549 30.012 52.2629 29.904 52.7189 29.904C53.4229 29.904 53.9829 30.12 54.3989 30.552C54.8229 30.976 55.0349 31.632 55.0349 32.52V36H54.0269V32.628C54.0269 31.388 53.5149 30.768 52.4909 30.768C51.9789 30.768 51.5509 30.956 51.2069 31.332C50.8709 31.7 50.7029 32.228 50.7029 32.916V36H49.6949Z"
      fill="black"
    />
  </Icon>
);

export const TextIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <line stroke="#666666" strokeWidth="4" x1="10" x2="78" y1="38" y2="38" />
    <line stroke="#666666" strokeWidth="4" x1="10" x2="78" y1="47" y2="47" />
    <line stroke="#666666" strokeWidth="4" x1="10" x2="50" y1="56" y2="56" />
  </Icon>
);

export const ImageIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <path
      d="M58 27H30.5C29.0418 27.0016 27.6438 27.5816 26.6127 28.6127C25.5816 29.6438 25.0016 31.0418 25 32.5V54.5C25.0016 55.9582 25.5816 57.3562 26.6127 58.3873C27.6438 59.4184 29.0418 59.9984 30.5 60H58C59.4582 59.9984 60.8562 59.4184 61.8873 58.3873C62.9184 57.3562 63.4984 55.9582 63.5 54.5V32.5C63.4984 31.0418 62.9184 29.6438 61.8873 28.6127C60.8562 27.5816 59.4582 27.0016 58 27ZM51.125 32.5C51.9408 32.5 52.7384 32.7419 53.4167 33.1952C54.0951 33.6484 54.6238 34.2927 54.936 35.0464C55.2482 35.8002 55.3299 36.6296 55.1707 37.4297C55.0116 38.2299 54.6187 38.9649 54.0418 39.5418C53.4649 40.1187 52.7299 40.5116 51.9297 40.6707C51.1296 40.8299 50.3002 40.7482 49.5464 40.436C48.7927 40.1238 48.1484 39.5951 47.6952 38.9167C47.2419 38.2384 47 37.4408 47 36.625C47.0011 35.5313 47.4361 34.4828 48.2094 33.7094C48.9828 32.9361 50.0313 32.5011 51.125 32.5ZM30.5 57.25C29.7707 57.25 29.0712 56.9603 28.5555 56.4445C28.0397 55.9288 27.75 55.2293 27.75 54.5V48.688L35.9003 41.4435C36.6867 40.7461 37.7094 40.3747 38.76 40.4051C39.8106 40.4354 40.8102 40.8652 41.555 41.6068L47.1366 47.1764L37.063 57.25H30.5ZM60.75 54.5C60.75 55.2293 60.4603 55.9288 59.9445 56.4445C59.4288 56.9603 58.7293 57.25 58 57.25H40.9526L51.3871 46.8155C52.1259 46.1872 53.0634 45.8411 54.0332 45.8386C55.003 45.836 55.9423 46.1773 56.6843 46.8017L60.75 50.1894V54.5Z"
      fill="#666666"
    />
  </Icon>
);

export const MultipleChoiceIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <circle cx="14.5" cy="18.5" fill="#DBDFE2" r="4.5" />
    <circle cx="14.5" cy="35.5" fill="#666666" r="4.5" />
    <circle cx="14.5" cy="52.5" fill="#DBDFE2" r="4.5" />
    <circle cx="14.5" cy="69.5" fill="#DBDFE2" r="4.5" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="23" x2="48" y1="35" y2="35" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="23" x2="70" y1="52" y2="52" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="23" x2="43" y1="70" y2="70" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="23" x2="80" y1="18" y2="18" />
  </Icon>
);

export const MultiSelectIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="20" x2="45" y1="35" y2="35" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="20" x2="67" y1="52" y2="52" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="20" x2="40" y1="70" y2="70" />
    <line stroke="#C4C4C4" strokeWidth="4" x1="20" x2="77" y1="18" y2="18" />
    <rect fill="#DBDFE2" height="9" rx="2" width="9" x="7" y="14" />
    <rect fill="#DBDFE2" height="9" rx="2" width="9" x="7" y="48" />
    <rect fill="#666666" height="9" rx="2" width="9" x="7" y="31" />
    <rect fill="#666666" height="9" rx="2" width="9" x="7" y="65" />
  </Icon>
);

export const ShortAnswerIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <rect fill="#666666" height="16" width="68" x="10" y="36" />
  </Icon>
);

export const FractionIcon = (): React.ReactElement => (
  <Icon boxSize="5em" viewBox="0 0 88 88">
    <rect fill="#E8EDF1" height="88" width="88" />
    <rect fill="#636363" height="18" rx="1" width="18" x="35" y="17" />
    <rect
      fill="#666666"
      height="18"
      rx="1"
      stroke="#BEBEBE"
      strokeWidth="2"
      width="18"
      x="35"
      y="17"
    />
    <rect fill="#636363" height="18" rx="1" width="18" x="35" y="53" />
    <rect
      fill="#666666"
      height="18"
      rx="1"
      stroke="#BEBEBE"
      strokeWidth="2"
      width="18"
      x="35"
      y="53"
    />
    <line stroke="#666666" x1="24" x2="64" y1="43.5" y2="43.5" />
  </Icon>
);

export const SettingsOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M12.94 22h-1.89a1.68 1.68 0 0 1-1.68-1.68v-1.09a.34.34 0 0 0-.22-.29.38.38 0 0 0-.41 0l-.74.8a1.67 1.67 0 0 1-2.37 0L4.26 18.4a1.66 1.66 0 0 1-.5-1.19 1.72 1.72 0 0 1 .5-1.21l.74-.74a.34.34 0 0 0 0-.37c-.06-.15-.16-.26-.3-.26H3.68A1.69 1.69 0 0 1 2 12.94v-1.89a1.68 1.68 0 0 1 1.68-1.68h1.09a.34.34 0 0 0 .29-.22.38.38 0 0 0 0-.41L4.26 8a1.67 1.67 0 0 1 0-2.37L5.6 4.26a1.65 1.65 0 0 1 1.18-.5 1.72 1.72 0 0 1 1.22.5l.74.74a.34.34 0 0 0 .37 0c.15-.06.26-.16.26-.3V3.68A1.69 1.69 0 0 1 11.06 2H13a1.68 1.68 0 0 1 1.68 1.68v1.09a.34.34 0 0 0 .22.29.38.38 0 0 0 .41 0l.69-.8a1.67 1.67 0 0 1 2.37 0l1.37 1.34a1.67 1.67 0 0 1 .5 1.19 1.63 1.63 0 0 1-.5 1.21l-.74.74a.34.34 0 0 0 0 .37c.06.15.16.26.3.26h1.09A1.69 1.69 0 0 1 22 11.06V13a1.68 1.68 0 0 1-1.68 1.68h-1.09a.34.34 0 0 0-.29.22.34.34 0 0 0 0 .37l.77.77a1.67 1.67 0 0 1 0 2.37l-1.31 1.33a1.65 1.65 0 0 1-1.18.5 1.72 1.72 0 0 1-1.19-.5l-.77-.74a.34.34 0 0 0-.37 0c-.15.06-.26.16-.26.3v1.09A1.69 1.69 0 0 1 12.94 22zm-1.57-2h1.26v-.77a2.33 2.33 0 0 1 1.46-2.14 2.36 2.36 0 0 1 2.59.47l.54.54.88-.88-.54-.55a2.34 2.34 0 0 1-.48-2.56 2.33 2.33 0 0 1 2.14-1.45H20v-1.29h-.77a2.33 2.33 0 0 1-2.14-1.46 2.36 2.36 0 0 1 .47-2.59l.54-.54-.88-.88-.55.54a2.39 2.39 0 0 1-4-1.67V4h-1.3v.77a2.33 2.33 0 0 1-1.46 2.14 2.36 2.36 0 0 1-2.59-.47l-.54-.54-.88.88.54.55a2.39 2.39 0 0 1-1.67 4H4v1.26h.77a2.33 2.33 0 0 1 2.14 1.46 2.36 2.36 0 0 1-.47 2.59l-.54.54.88.88.55-.54a2.39 2.39 0 0 1 4 1.67z"
      fill="currentColor"
    />
    <path
      d="M12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"
      fill="currentColor"
    />
  </Icon>
);

export const AlertIcon = (): React.ReactElement => (
  <Icon boxSize="72px" color="red.500">
    <path
      d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66 3 3 0 0 0-.05-3.04zm-1.7 2.05a1.31 1.31 0 0 1-1.19.65H4.33a1.31 1.31 0 0 1-1.19-.65 1 1 0 0 1 0-1l7.68-12.73a1.48 1.48 0 0 1 2.36 0l7.67 12.72a1 1 0 0 1 .01 1.01z"
      fill="currentColor"
    />
    <circle cx="12" cy="16" fill="currentColor" r="1" />
    <path
      d="M12 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"
      fill="currentColor"
    />
  </Icon>
);

export const SearchOutlineIcon = (): React.ReactElement => (
  <Icon color="grey.300" viewBox="0 0 24 24">
    <path
      d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z"
      fill="currentColor"
    />
  </Icon>
);

export const SortOptionsIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 18 18">
    <path
      d="M7.5 13.5H10.5V12H7.5V13.5ZM2.25 4.5V6H15.75V4.5H2.25ZM4.5 9.75H13.5V8.25H4.5V9.75Z"
      fill="currentColor"
    />
  </Icon>
);

export const FilterOptionsIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M19 9a3 3 0 0 0-2.82 2H3a1 1 0 0 0 0 2h13.18A3 3 0 1 0 19 9zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
      fill="currentColor"
    />
    <path
      d="M3 7h1.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2H9.82a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2zm4-2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
      fill="currentColor"
    />
    <path
      d="M21 17h-7.18a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2h5.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2zm-10 2a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
      fill="currentColor"
    />
  </Icon>
);

export const CheckmarkCircleOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
      fill="currentColor"
    />
    <path
      d="M14.7 8.39l-3.78 5-1.63-2.11a1 1 0 0 0-1.58 1.23l2.43 3.11a1 1 0 0 0 .79.38 1 1 0 0 0 .79-.39l4.57-6a1 1 0 1 0-1.6-1.22z"
      fill="currentColor"
    />
  </Icon>
);

export const CheckmarkCircleFillIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61l-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08 3.78-5a1 1 0 1 1 1.6 1.22z"
      fill="currentColor"
    />
  </Icon>
);

export const FunnelIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M13.9 22a1 1 0 0 1-.6-.2l-4-3.05a1 1 0 0 1-.39-.8v-3.27l-4.8-9.22A1 1 0 0 1 5 4h14a1 1 0 0 1 .86.49 1 1 0 0 1 0 1l-5 9.21V21a1 1 0 0 1-.55.9 1 1 0 0 1-.41.1zm-3-4.54l2 1.53v-4.55A1 1 0 0 1 13 14l4.3-8H6.64l4.13 8a1 1 0 0 1 .11.46z"
      fill="currentColor"
    />
  </Icon>
);

export const EditOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z" fill="currentColor" />
    <path
      d="M5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 18zM15.27 4L18 6.73l-2 1.95L13.32 6zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28z"
      fill="currentColor"
    />
  </Icon>
);

export const DeleteOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12z"
      fill="currentColor"
    />
    <path
      d="M9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z"
      fill="currentColor"
    />
    <path
      d="M15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z"
      fill="currentColor"
    />
  </Icon>
);

export const HamburgerMenuIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <rect
      fill="currentColor"
      height="2"
      rx=".95"
      ry=".95"
      width="18"
      x="3"
      y="11"
    />
    <rect
      fill="currentColor"
      height="2"
      rx=".95"
      ry=".95"
      width="18"
      x="3"
      y="16"
    />
    <rect
      fill="currentColor"
      height="2"
      rx=".95"
      ry=".95"
      width="18"
      x="3"
      y="6"
    />
  </Icon>
);

export const MultipleChoiceTagIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <circle cx="4" cy="7" fill="currentColor" r="1" />
    <circle cx="4" cy="12" fill="currentColor" r="1" />
    <circle cx="4" cy="17" fill="currentColor" r="1" />
    <rect
      fill="currentColor"
      height="2"
      rx=".94"
      ry=".94"
      width="14"
      x="7"
      y="11"
    />
    <rect
      fill="currentColor"
      height="2"
      rx=".94"
      ry=".94"
      width="14"
      x="7"
      y="16"
    />
    <rect
      fill="currentColor"
      height="2"
      rx=".94"
      ry=".94"
      width="14"
      x="7"
      y="6"
    />
  </Icon>
);

export const ShortAnswerTagIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M20 4H4a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V6h6v13H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2V6h6v2a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1z"
      fill="currentColor"
    />
  </Icon>
);

export const MultiSelectTagIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"
      fill="currentColor"
    />
    <path
      d="M14.7 8.39l-3.78 5-1.63-2.11a1 1 0 0 0-1.58 1.23l2.43 3.11a1 1 0 0 0 .79.38 1 1 0 0 0 .79-.39l4.57-6a1 1 0 1 0-1.6-1.22z"
      fill="currentColor"
    />
  </Icon>
);

export const FractionTagIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path d="M7 21L14.9 3H17L9.1 21H7Z" fill="currentColor" />
  </Icon>
);

export const TextOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <rect height="24" opacity="0" width="24" />
    <path d="M15 16H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z" fill="currentColor" />
    <path d="M9 14h3a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2z" fill="currentColor" />
    <path
      d="M19.74 8.33l-5.44-6a1 1 0 0 0-.74-.33h-7A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V9a1 1 0 0 0-.26-.67zM14 5l2.74 3h-2a.79.79 0 0 1-.74-.85zm3.44 15H6.56a.53.53 0 0 1-.56-.5v-15a.53.53 0 0 1 .56-.5H12v3.15A2.79 2.79 0 0 0 14.71 10H18v9.5a.53.53 0 0 1-.56.5z"
      fill="currentColor"
    />
  </Icon>
);

export const SaveOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <rect height="24" opacity="0" width="24" />
    <path
      d="M20.12 8.71l-4.83-4.83A3 3 0 0 0 13.17 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7.17a3 3 0 0 0-.88-2.12zM10 19v-2h4v2zm9-1a1 1 0 0 1-1 1h-2v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2v5a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2h-3V5h3.17a1.05 1.05 0 0 1 .71.29l4.83 4.83a1 1 0 0 1 .29.71z"
      fill="currentColor"
    />
  </Icon>
);

export const EyeOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <rect height="24" opacity="0" width="24" />
    <path
      d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"
      fill="currentColor"
    />
    <path
      d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
      fill="currentColor"
    />
  </Icon>
);

export const LeftArrowIcon = (props: IconProps): React.ReactElement => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"
      fill="currentColor"
    />
  </Icon>
);

export const SadFaceIcon = (): React.ReactElement => (
  <Icon fill="none" height="50" viewBox="0 0 50 50" width="50">
    <path
      d="M17.125 24.998C18.5747 24.998 19.75 23.8228 19.75 22.373C19.75 20.9233 18.5747 19.748 17.125 19.748C15.6753 19.748 14.5 20.9233 14.5 22.373C14.5 23.8228 15.6753 24.998 17.125 24.998Z"
      fill="#154472"
    />
    <path
      d="M25.0002 28.4961C29.968 28.4961 34.1461 31.7259 35.4684 36.1337C35.5056 36.2654 35.5113 36.4039 35.4852 36.5381C35.4592 36.6724 35.402 36.7986 35.3183 36.9068C35.2346 37.0149 35.1267 37.102 35.0033 37.1609C34.8799 37.2198 34.7444 37.249 34.6077 37.2461H15.3916C15.2553 37.2481 15.1204 37.2183 14.9977 37.159C14.875 37.0997 14.7678 37.0126 14.6848 36.9046C14.6017 36.7965 14.545 36.6706 14.5192 36.5367C14.4934 36.4029 14.4993 36.2649 14.5363 36.1337C15.8477 31.7259 20.0269 28.4961 25.0002 28.4961Z"
      fill="#154472"
    />
    <path
      d="M32.875 24.998C34.3247 24.998 35.5 23.8228 35.5 22.373C35.5 20.9233 34.3247 19.748 32.875 19.748C31.4253 19.748 30.25 20.9233 30.25 22.373C30.25 23.8228 31.4253 24.998 32.875 24.998Z"
      fill="#154472"
    />
    <path
      d="M25.0022 47.7519C37.5667 47.7519 47.7522 37.5664 47.7522 25.0019C47.7522 12.4375 37.5667 2.25195 25.0022 2.25195C12.4377 2.25195 2.2522 12.4375 2.2522 25.0019C2.2522 37.5664 12.4377 47.7519 25.0022 47.7519Z"
      stroke="#154472"
      strokeMiterlimit="10"
      strokeWidth="2.625"
    />
  </Icon>
);

export const CheckmarkIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <path
      d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"
      fill="currentColor"
    />
  </Icon>
);

export const PeopleIcon = (): React.ReactElement => (
  <Icon color="blue.300" viewBox="0 0 24 24">
    <path
      d="M9 11C9.79113 11 10.5645 10.7654 11.2223 10.3259C11.8801 9.88635 12.3928 9.26164 12.6955 8.53074C12.9983 7.79983 13.0775 6.99556 12.9231 6.21964C12.7688 5.44372 12.3878 4.73098 11.8284 4.17157C11.269 3.61216 10.5563 3.2312 9.78036 3.07686C9.00444 2.92252 8.20017 3.00173 7.46927 3.30448C6.73836 3.60723 6.11365 4.11992 5.67412 4.77772C5.2346 5.43552 5 6.20888 5 7C5 8.06087 5.42143 9.07828 6.17157 9.82843C6.92172 10.5786 7.93913 11 9 11Z"
      fill="currentColor"
    />
    <path
      d="M17 13C17.5933 13 18.1734 12.8241 18.6667 12.4944C19.1601 12.1648 19.5446 11.6962 19.7716 11.1481C19.9987 10.5999 20.0581 9.99667 19.9424 9.41473C19.8266 8.83279 19.5409 8.29824 19.1213 7.87868C18.7018 7.45912 18.1672 7.1734 17.5853 7.05765C17.0033 6.94189 16.4001 7.0013 15.8519 7.22836C15.3038 7.45543 14.8352 7.83994 14.5056 8.33329C14.1759 8.82664 14 9.40666 14 10C14 10.7957 14.3161 11.5587 14.8787 12.1213C15.4413 12.6839 16.2044 13 17 13Z"
      fill="currentColor"
    />
    <path
      d="M21 20.0001C21.2652 20.0001 21.5196 19.8947 21.7071 19.7072C21.8946 19.5196 22 19.2653 22 19.0001C21.9992 18.0655 21.7365 17.1498 21.2416 16.3569C20.7468 15.5641 20.0396 14.9258 19.2003 14.5145C18.3611 14.1032 17.4234 13.9354 16.4936 14.0301C15.5638 14.1247 14.6791 14.4781 13.94 15.0501C12.9605 14.0744 11.7141 13.4106 10.3578 13.1425C9.00159 12.8743 7.59632 13.0137 6.31923 13.5432C5.04213 14.0726 3.95041 14.9684 3.18174 16.1175C2.41307 17.2666 2.00187 18.6176 2 20.0001C2 20.2653 2.10536 20.5196 2.29289 20.7072C2.48043 20.8947 2.73478 21.0001 3 21.0001H15C15.2652 21.0001 15.5196 20.8947 15.7071 20.7072C15.8946 20.5196 16 20.2653 16 20.0001"
      fill="currentColor"
    />
  </Icon>
);

export const BookOpenIcon = (): React.ReactElement => (
  <Icon color="blue.300" viewBox="0 0 24 24">
    <path
      d="M21 4.34009C20.85 4.22093 20.6744 4.13815 20.487 4.09824C20.2996 4.05834 20.1056 4.06239 19.92 4.11009L13 5.89009V20.1601L20.56 18.2201C20.8304 18.1509 21.0699 17.9932 21.2402 17.7721C21.4106 17.551 21.502 17.2792 21.5 17.0001V5.32009C21.4969 5.12943 21.4503 4.94199 21.3636 4.77213C21.277 4.60227 21.1526 4.45448 21 4.34009Z"
      fill="currentColor"
    />
    <path
      d="M11.0001 5.88988L4.06011 4.10988C3.87741 4.06758 3.6876 4.06626 3.50432 4.10603C3.32105 4.1458 3.14885 4.22566 3.00011 4.33988C2.84854 4.45839 2.72637 4.61028 2.64312 4.78373C2.55986 4.95718 2.51777 5.1475 2.52011 5.33988V16.9999C2.52032 17.2773 2.6128 17.5467 2.78298 17.7658C2.95316 17.9849 3.19138 18.1411 3.46011 18.2099L11.0001 20.1599V5.88988Z"
      fill="currentColor"
    />
  </Icon>
);

export const BarChartIcon = (): React.ReactElement => (
  <Icon color="blue.300" viewBox="0 0 24 24">
    <path
      d="M12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21C12.2652 21 12.5196 20.8946 12.7071 20.7071C12.8946 20.5196 13 20.2652 13 20V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8Z"
      fill="currentColor"
    />
    <path
      d="M19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V20C18 20.2652 18.1054 20.5196 18.2929 20.7071C18.4804 20.8946 18.7348 21 19 21C19.2652 21 19.5196 20.8946 19.7071 20.7071C19.8946 20.5196 20 20.2652 20 20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4Z"
      fill="currentColor"
    />
    <path
      d="M5 12C4.73478 12 4.48043 12.1054 4.29289 12.2929C4.10536 12.4804 4 12.7348 4 13V20C4 20.2652 4.10536 20.5196 4.29289 20.7071C4.48043 20.8946 4.73478 21 5 21C5.26522 21 5.51957 20.8946 5.70711 20.7071C5.89464 20.5196 6 20.2652 6 20V13C6 12.7348 5.89464 12.4804 5.70711 12.2929C5.51957 12.1054 5.26522 12 5 12Z"
      fill="currentColor"
    />
  </Icon>
);

export const UploadOutlineIcon = (): React.ReactElement => (
  <Icon boxSize="20px">
    <path
      d="M5 6L19 6C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4L5 4C4.44771 4 4 4.44772 4 5C4 5.55228 4.44771 6 5 6Z"
      fill="currentColor"
    />
    <path
      d="M20 7V5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5V7C18 7.55228 18.4477 8 19 8C19.5523 8 20 7.55228 20 7Z"
      fill="currentColor"
    />
    <path
      d="M6 7V5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5V7C4 7.55228 4.44772 8 5 8C5.55228 8 6 7.55228 6 7Z"
      fill="currentColor"
    />
    <path
      d="M8 13.9999C7.84476 13.9999 7.69164 13.9638 7.55279 13.8943C7.41393 13.8249 7.29315 13.7241 7.2 13.5999C7.12121 13.4949 7.06388 13.3753 7.03129 13.2481C6.99869 13.1209 6.99148 12.9885 7.01005 12.8585C7.02862 12.7285 7.07262 12.6034 7.13953 12.4904C7.20643 12.3774 7.29494 12.2787 7.4 12.1999L11.4 9.19992C11.5713 9.07477 11.7779 9.00732 11.99 9.00732C12.2021 9.00732 12.4087 9.07477 12.58 9.19992L16.58 12.0199C16.7956 12.1729 16.9419 12.4049 16.9868 12.6654C17.0318 12.9259 16.9718 13.1935 16.82 13.4099C16.7442 13.5181 16.6478 13.6101 16.5362 13.6808C16.4246 13.7515 16.3002 13.7994 16.17 13.8217C16.0399 13.844 15.9066 13.8403 15.7778 13.8108C15.6491 13.7813 15.5275 13.7267 15.42 13.6499L12 11.2399L8.6 13.7999C8.4269 13.9297 8.21637 13.9999 8 13.9999Z"
      fill="currentColor"
    />
    <path
      d="M12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071C11.1054 20.5196 11 20.2652 11 20V12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12V20C13 20.2652 12.8946 20.5196 12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21Z"
      fill="currentColor"
    />
  </Icon>
);

export const CopyIcon = (props: IconProps): React.ReactElement => (
  <Icon color="blue.300" viewBox="0 1 24 25" {...props}>
    <g clipPath="url(#clip0_46_2644)">
      <path
        d="M18 9H15V5.67C14.9974 4.96268 14.7152 4.28509 14.2151 3.78494C13.7149 3.28478 13.0373 3.00263 12.33 3H5.67C4.96268 3.00263 4.28509 3.28478 3.78494 3.78494C3.28478 4.28509 3.00263 4.96268 3 5.67V12.33C3.00263 13.0373 3.28478 13.7149 3.78494 14.2151C4.28509 14.7152 4.96268 14.9974 5.67 15H9V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V12C21 11.2044 20.6839 10.4413 20.1213 9.87868C19.5587 9.31607 18.7956 9 18 9ZM9 12V13H5.67C5.49231 13 5.32189 12.9294 5.19624 12.8038C5.07059 12.6781 5 12.5077 5 12.33V5.67C5 5.49231 5.07059 5.32189 5.19624 5.19624C5.32189 5.07059 5.49231 5 5.67 5H12.33C12.5077 5 12.6781 5.07059 12.8038 5.19624C12.9294 5.32189 13 5.49231 13 5.67V9H12C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_46_2644">
        <rect fill="white" height="24" width="24" />
      </clipPath>
    </defs>
  </Icon>
);

export const PaperPlaneOutlineIcon = (): React.ReactElement => (
  <Icon viewBox="0 0 24 24">
    <rect height="24" opacity="0" width="24" />
    <path
      d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z"
      fill="currentColor"
    />
  </Icon>
);
