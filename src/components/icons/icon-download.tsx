import * as React from 'react';
import { SVGProps } from 'react';

type IconDownloadProps = SVGProps<SVGSVGElement>;

const IconDownload: React.FC<IconDownloadProps> = props => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.97 15.53C12.04 15.6 12.12 15.65 12.21 15.69C12.3 15.73 12.4 15.75 12.5 15.75C12.6 15.75 12.7 15.73 12.79 15.69C12.88 15.65 12.96 15.6 13.03 15.53L17.03 11.53C17.32 11.24 17.32 10.76 17.03 10.47C16.74 10.18 16.26 10.18 15.97 10.47L13.25 13.19V4C13.25 3.59 12.91 3.25 12.5 3.25C12.09 3.25 11.75 3.59 11.75 4V13.19L9.03 10.47C8.74 10.18 8.26 10.18 7.97 10.47C7.68 10.76 7.68 11.24 7.97 11.53L11.97 15.53Z"
        fill="#022A9A"
      />
      <path
        d="M21.5 12.25C21.09 12.25 20.75 12.59 20.75 13V16C20.75 17.79 19.29 19.25 17.5 19.25H7.5C5.71 19.25 4.25 17.79 4.25 16V13C4.25 12.59 3.91 12.25 3.5 12.25C3.09 12.25 2.75 12.59 2.75 13V16C2.75 18.62 4.88 20.75 7.5 20.75H17.5C20.12 20.75 22.25 18.62 22.25 16V13C22.25 12.59 21.91 12.25 21.5 12.25Z"
        fill="#022A9A"
      />
    </svg>
  );
};

export default IconDownload;
