# freecycle-web-app

<!-- PROJECT LOGO -->
<br />

<h3 align="center">Freecycle ("SecondLife") Web App</h3>

  <p align="center">
    A place to give and get stuff for free in London. 
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![SecondLife Web App Screen Shot](/public/images/SecondLife_Home.png)

A marketplace application to give away unwanted items and save them from going to landfill. 

You can add an item to give away by providing a title, description, image and contact details/location to let people know where to pick it up from. 
Admins / logged in users can edit & delete their items, and mark them as taken. 
The main page has a search functionality and only shows available items.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* React
* Express
* Mysql 
* Vanilla CSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting started

### Prerequisites

- Run `npm install` in project directory to install server-related dependencies such as `express`.
- `cd client` and run `npm install` to install client dependencies (React).

### Installation

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database: `create database freecycle`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=freecycle
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'items' in your database.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

![Userflow mockup](/public/images/MVP_Userflow_Mockup.svg)

[Database schema](https://drawsql.app/teams/katja-pollmanns-team/diagrams/mvp-project)

Currently only items exists, users table not yet created

![Database schema](/public/images/MVP_database_schema.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add User Login
- [ ] Add categories
- [ ] Add image upload / multiple images functionality
- [ ] Add pagination
- [ ] Add location with latitude/longitude and the option to filter by location 
- [ ] Add timestamp for date the item was added


See the [open issues](https://github.com/kpo18/freecycle-web-app/issues) for a full list of proposed features (and known issues).

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



<!-- LICENSE -->
## License

Distributed under the MIT License. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Katja Pollmann - [LinkedIn Profile](www.linkedin.com/in/katja-pollmann-613989a7) - katjapollmann@hotmail.com

Project Link: [https://github.com/kpo18/freecycle-web-app](https://github.com/kpo18/freecycle-web-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


