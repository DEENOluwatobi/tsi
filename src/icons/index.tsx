const sizes = {
  xs: "h-auto w-3",
  sm: "h-auto w-4",
  md: "h-auto w-5",
  mid: "h-auto w-6",
  lg: "h-auto w-7",
  xl: "h-auto w-9",
  xxl: "h-auto w-14",
  original: "",
};

interface iconProp {
  size?: "xs" | "sm" | "md" | "mid" | "lg" | "xl" | "xxl" | "original";
  className?: string;
  fill?: string;
}

export const Xicon2 = ({ size = "original", className}: iconProp) => {
  return(
    <svg className={`${sizes[size]} ${className ? className : ""}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill=""><path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path></svg>
  )
}

export const ColonIcon = ({ size = "original", className }: iconProp) => {
  return (
    <svg className={`${sizes[size]} ${className ? className : ""}`}  width="56" height="33" viewBox="0 0 56 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_569_10665)">
      <path d="M21.56 32.92H0.56L14 0.759997H27.8L21.56 32.92ZM48.8 32.92H27.92L41.36 0.759997H55.04L48.8 32.92Z" fill="white"/>
      </g>
      <defs>
      <filter id="filter0_d_569_10665" x="0.560059" y="0.759766" width="54.48" height="32.1602" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.01 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_569_10665"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_569_10665" result="shape"/>
      </filter>
      </defs>
    </svg>
  )
};

export const FacebookIcon = ({ size = "original", className }: iconProp) => {
  return (
    <svg className={`${sizes[size]} ${className ? className : ""}`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.7812 3.28125H4.21875C3.7002 3.28125 3.28125 3.7002 3.28125 4.21875V25.7812C3.28125 26.2998 3.7002 26.7188 4.21875 26.7188H25.7812C26.2998 26.7188 26.7188 26.2998 26.7188 25.7812V4.21875C26.7188 3.7002 26.2998 3.28125 25.7812 3.28125ZM23.0742 10.1221H21.2021C19.7344 10.1221 19.4502 10.8193 19.4502 11.8447V14.1035H22.9541L22.4971 17.6396H19.4502V26.7188H15.7969V17.6426H12.7412V14.1035H15.7969V11.4961C15.7969 8.46973 17.6455 6.82031 20.3467 6.82031C21.6416 6.82031 22.752 6.91699 23.0771 6.96094V10.1221H23.0742Z" fill="white"/>
    </svg>
 )
};

export const TwitterIcon = ({ size = "original", className }: iconProp) => {
  return (
    <svg className={`${sizes[size]} ${className ? className : ""}`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.7812 3.28125H4.21875C3.7002 3.28125 3.28125 3.7002 3.28125 4.21875V25.7812C3.28125 26.2998 3.7002 26.7188 4.21875 26.7188H25.7812C26.2998 26.7188 26.7188 26.2998 26.7188 25.7812V4.21875C26.7188 3.7002 26.2998 3.28125 25.7812 3.28125ZM21.3076 11.7686C21.3164 11.9062 21.3164 12.0498 21.3164 12.1904C21.3164 16.4912 18.041 21.4453 12.0557 21.4453C10.21 21.4453 8.49902 20.9092 7.05762 19.9863C7.32129 20.0156 7.57324 20.0273 7.84277 20.0273C9.36621 20.0273 10.7666 19.5117 11.8828 18.6387C10.4531 18.6094 9.25195 17.6719 8.8418 16.3828C9.34277 16.4561 9.79395 16.4561 10.3096 16.3242C9.57342 16.1747 8.91174 15.7749 8.43696 15.1927C7.96218 14.6106 7.70357 13.8821 7.70508 13.1309V13.0898C8.13574 13.333 8.64258 13.4824 9.17285 13.5029C8.72708 13.2058 8.3615 12.8034 8.10853 12.3311C7.85556 11.8589 7.72302 11.3316 7.72266 10.7959C7.72266 10.1895 7.88086 9.63574 8.16504 9.15527C8.98214 10.1611 10.0017 10.9838 11.1576 11.5698C12.3135 12.1558 13.5797 12.4921 14.874 12.5566C14.4141 10.3447 16.0664 8.55469 18.0527 8.55469C18.9902 8.55469 19.834 8.94727 20.4287 9.58008C21.1641 9.44238 21.8672 9.16699 22.4941 8.79785C22.251 9.55078 21.7412 10.1865 21.0645 10.5879C21.7207 10.5176 22.3535 10.3359 22.9395 10.0811C22.4971 10.7314 21.9434 11.3086 21.3076 11.7686Z" fill="white"/>
    </svg>
)
};

export const InstagramIcon = ({ size = "original", className }: iconProp) => {
  return (
    <svg className={`${sizes[size]} ${className ? className : ""}`} width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_572_16727)">
      <path d="M13.125 11.8746C12.5069 11.8748 11.9028 12.0583 11.3889 12.4019C10.8751 12.7455 10.4747 13.2337 10.2384 13.8048C10.002 14.3759 9.94025 15.0043 10.061 15.6105C10.1817 16.2166 10.4795 16.7734 10.9166 17.2104C11.3537 17.6474 11.9106 17.9449 12.5169 18.0654C13.1231 18.1859 13.7515 18.124 14.3225 17.8874C14.8935 17.6508 15.3815 17.2502 15.7249 16.7363C16.0683 16.2223 16.2516 15.6181 16.2516 15C16.2509 14.1711 15.9213 13.3763 15.3351 12.7903C14.7488 12.2043 13.9539 11.8749 13.125 11.8746ZM20.4322 9.47227C20.2731 9.06905 20.0329 8.70282 19.7263 8.39631C19.4198 8.0898 19.0536 7.84954 18.6504 7.69043C17.4199 7.20469 14.4902 7.31367 13.125 7.31367C11.7598 7.31367 8.83301 7.20059 7.59902 7.69043C7.19581 7.84954 6.82958 8.0898 6.52307 8.39631C6.21656 8.70282 5.97629 9.06905 5.81719 9.47227C5.33203 10.7027 5.44043 13.6354 5.44043 14.9994C5.44043 16.3635 5.33203 19.2926 5.81953 20.5271C5.97864 20.9304 6.2189 21.2966 6.52541 21.6031C6.83193 21.9096 7.19815 22.1499 7.60137 22.309C8.83184 22.7947 11.7615 22.6857 13.1273 22.6857C14.4932 22.6857 17.4188 22.7988 18.6527 22.309C19.056 22.1499 19.4222 21.9096 19.7287 21.6031C20.0352 21.2966 20.2755 20.9304 20.4346 20.5271C20.9238 19.2967 20.8113 16.3641 20.8113 15C20.8113 13.6359 20.9238 10.7074 20.4346 9.47285L20.4322 9.47227ZM13.125 19.8047C12.1747 19.8047 11.2458 19.5229 10.4557 18.995C9.66553 18.467 9.0497 17.7166 8.68605 16.8387C8.32239 15.9607 8.22724 14.9947 8.41263 14.0627C8.59802 13.1306 9.05562 12.2745 9.72757 11.6026C10.3995 10.9306 11.2556 10.473 12.1877 10.2876C13.1197 10.1022 14.0857 10.1974 14.9637 10.561C15.8416 10.9247 16.592 11.5405 17.12 12.3307C17.6479 13.1208 17.9297 14.0497 17.9297 15C17.9305 15.6312 17.8067 16.2563 17.5655 16.8396C17.3243 17.4229 16.9705 17.9528 16.5241 18.3991C16.0778 18.8455 15.5479 19.1993 14.9646 19.4405C14.3813 19.6817 13.7562 19.8055 13.125 19.8047ZM18.1277 11.1152C17.9059 11.1153 17.689 11.0497 17.5045 10.9265C17.32 10.8034 17.1762 10.6282 17.0912 10.4233C17.0062 10.2184 16.9839 9.9929 17.0271 9.77532C17.0703 9.55773 17.1771 9.35785 17.3339 9.20095C17.4908 9.04405 17.6906 8.93718 17.9081 8.89386C18.1257 8.85054 18.3512 8.87271 18.5562 8.95758C18.7611 9.04244 18.9363 9.18619 19.0596 9.37063C19.1828 9.55507 19.2486 9.77192 19.2486 9.99375C19.2493 10.1411 19.2208 10.287 19.1648 10.4233C19.1089 10.5596 19.0266 10.6835 18.9227 10.7879C18.8188 10.8923 18.6953 10.9752 18.5593 11.0318C18.4232 11.0883 18.2774 11.1175 18.1301 11.1176L18.1277 11.1152ZM23.4375 1.875H2.8125C2.06658 1.875 1.35121 2.17132 0.823762 2.69876C0.296316 3.22621 0 3.94158 0 4.6875L0 25.3125C0 26.0584 0.296316 26.7738 0.823762 27.3012C1.35121 27.8287 2.06658 28.125 2.8125 28.125H23.4375C24.1834 28.125 24.8988 27.8287 25.4262 27.3012C25.9537 26.7738 26.25 26.0584 26.25 25.3125V4.6875C26.25 3.94158 25.9537 3.22621 25.4262 2.69876C24.8988 2.17132 24.1834 1.875 23.4375 1.875ZM22.4344 18.8672C22.3588 20.3689 22.016 21.6996 20.9197 22.793C19.8234 23.8863 18.4939 24.2361 16.9939 24.3076C15.4465 24.3949 10.807 24.3949 9.25957 24.3076C7.75781 24.232 6.43184 23.8887 5.33379 22.793C4.23574 21.6973 3.89062 20.366 3.81914 18.8672C3.73184 17.3191 3.73184 12.6791 3.81914 11.1328C3.89473 9.63105 4.2334 8.30039 5.33379 7.20703C6.43418 6.11367 7.76367 5.76797 9.25957 5.69648C10.807 5.60918 15.4465 5.60918 16.9939 5.69648C18.4957 5.77207 19.8258 6.11543 20.9197 7.21113C22.0137 8.30684 22.3629 9.63809 22.4344 11.1398C22.5217 12.682 22.5217 17.318 22.4344 18.8672Z" fill="white"/>
      </g>
      <defs>
      <clipPath id="clip0_572_16727">
      <rect width="26.25" height="30" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
};

export const LinkedInIcon = ({ size = "original", className }: iconProp) => {
  return (
    <svg className={`${sizes[size]} ${className ? className : ""}`} width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 3.5475C1.5 2.93817 1.74206 2.35379 2.17292 1.92293C2.60379 1.49206 3.18817 1.25 3.7975 1.25H26.7C27.002 1.24951 27.3011 1.30858 27.5802 1.42384C27.8593 1.53909 28.1129 1.70827 28.3266 1.92167C28.5402 2.13508 28.7097 2.38853 28.8252 2.66752C28.9408 2.9465 29.0002 3.24553 29 3.5475V26.45C29.0003 26.752 28.9411 27.0512 28.8257 27.3303C28.7103 27.6094 28.541 27.863 28.3275 28.0766C28.114 28.2903 27.8605 28.4597 27.5814 28.5752C27.3024 28.6908 27.0033 28.7502 26.7012 28.75H3.7975C3.49568 28.75 3.19682 28.6905 2.918 28.575C2.63917 28.4595 2.38584 28.2901 2.17248 28.0766C1.95912 27.8632 1.78991 27.6097 1.67453 27.3308C1.55914 27.052 1.49984 26.7531 1.5 26.4512V3.5475ZM12.385 11.735H16.1087V13.605C16.6462 12.53 18.0212 11.5625 20.0875 11.5625C24.0487 11.5625 24.9875 13.7038 24.9875 17.6325V24.91H20.9787V18.5275C20.9787 16.29 20.4412 15.0275 19.0762 15.0275C17.1825 15.0275 16.395 16.3888 16.395 18.5275V24.91H12.385V11.735ZM5.51 24.7388H9.52V11.5625H5.51V24.7375V24.7388ZM10.0938 7.265C10.1013 7.60834 10.0402 7.94974 9.91405 8.26915C9.78788 8.58855 9.59919 8.87955 9.35904 9.12504C9.11889 9.37054 8.83212 9.56559 8.51557 9.69876C8.19901 9.83193 7.85905 9.90052 7.51562 9.90052C7.1722 9.90052 6.83224 9.83193 6.51568 9.69876C6.19913 9.56559 5.91236 9.37054 5.67221 9.12504C5.43206 8.87955 5.24337 8.58855 5.1172 8.26915C4.99103 7.94974 4.92994 7.60834 4.9375 7.265C4.95234 6.59107 5.23048 5.94974 5.71236 5.47836C6.19423 5.00698 6.84153 4.74302 7.51562 4.74302C8.18972 4.74302 8.83702 5.00698 9.31889 5.47836C9.80077 5.94974 10.0789 6.59107 10.0938 7.265Z" fill="white"/>
    </svg>
  )
};

