<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/agilityfeat/customer-service-airline-demo">
    <img src="public/icons/logo.svg" alt="Logo" width="300" height="300">
  </a>
  
[![LinkedIn][linkedin-shield]][linkedin-url]

  <h3 align="center">Air WebRTC: Customer Airline Service Demo Project</h3>

  <p align="center">
    <a href="https://webrtc.ventures/2023/02/enhancing-customer-service-experiences-with-vonage-and-symbl-ai/"><strong>View Blog Post»</strong></a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


This is a demo project to present how customer services can be enhanced using Symbl.ai and Vonage communication API. 

Here's a quick description about the functionality of the demo project:
* Customers can connect with the airline's customer care agents using Vonage SDK.
* They can share their audio and video along with controls to turn them on/off.
* Airline customer care agents can see real-time sentiment analysis during the conversation along with the transcription. 
* Airline agents can view all the questions asked by customers during the real-time conversation.
.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

Following framework/libraries were used to develop the project.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vonage][Vonage.sdk]][Vonage-url]
* [![Symbl][Symbl.ai]][Symbl-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to get a copy of the project running in your local environment.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [Nodejs](https://www.nodejs.org)
* [Vonage account](https://www.vonage.com)
* [Symbl.ai account](https://www.symbl.ai)


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Create an opentok application from vonage dashboard and note down api key and secret.

2. Clone the repo
   ```sh
   git clone https://github.com/agilityfeat/customer-service-airline-demo.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a .env file and add following opentok environment variables
   ```js
   /* PRODUCTION WARNING! A secure mechanism with proper authentication should be used to generate opentok access token and session Id */

   NEXT_PUBLIC_OPENTOK_API_KEY='ENTER YOUR OPENTOK API KEY';
   NEXT_PUBLIC_OPENTOK_SECRET='ENTER YOUR OPENTOK APPLICATION SECRET';
   NEXT_PUBLIC_OPENTOK_SESSION_ID='ENTER YOUR GENERATED OPENTOK SESSION ID';
   NEXT_PUBLIC_OPENTOK_TOKEN='ENTER YOUR GENERATED OPENTOK ACCESS TOKEN';
   ```

5. Add following variables from the symbl.ai dashboard in the src/config/symbl.ts file
  ```js
   /* PRODUCTION WARNING! A secure mechanism with proper authentication should be used to generate symbl.ai access token and session Id */

    const symblConfig = {
        BASE_URI: 'https://api.symbl.ai/v1',
        SESSION_ID: 'ANY UNIQUE SESSION ID',
        ACCESS_TOKEN: 'ENTER GENERATED Symbl.ai Access Token',
    };
   ```

6. Run the project from the terminal using: ``` npm run start or yarn start ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Webrtc.ventures Team - [@WebRTCVentures](https://twitter.com/WebRTCVentures) - info@webrtc.ventures

Project Link: [https://github.com/agilityfeat/customer-service-airline-demo](https://github.com/agilityfeat/customer-service-airline-demo)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/company/webrtc-ventures
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vonage.sdk]: https://img.shields.io/badge/Vonage-black?style=for-the-badge
[Vonage-url]: https://vonage.com/
[Symbl.ai]: https://img.shields.io/badge/Symbl.ai-563D7C?style=for-the-badge
[Symbl-url]: https://symbl.ai/
