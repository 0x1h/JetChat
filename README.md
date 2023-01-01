<div align="center">
	<img src="https://i.ibb.co/GRrgpSW/large-jetchat.png">
</div>
 
## About Project
This is open-source web chatting app, you can there

* Create account
* Create private rooms
* Join in global chat 
* kick users 
* ban users
* chat with people

## Built with  

This project uses 
* **[Node.js](https://github.com/nodejs/node)**
* **[Typescript](https://github.com/microsoft/TypeScript)**
* **[React](https://github.com/facebook/react)**
* **[Socket.io](https://github.com/socketio/socket.io)**
* **[MongoDB](https://github.com/mongodb/mongo)**
*  **[Mongoose](https://github.com/Automattic/mongoose)**
*  **[Redux](https://github.com/reduxjs/redux)**

<div>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white`">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
</div>

## Getting Started

1) clone repo
```shell
git clone https://github.com/callmenikk/JetChat.git
```
2)
then you must setup **database configs**, **re-captcha tokens** and **host**
go to `src/utils/hostConfigs.json`
and set your prefered host

```json
{
   "host": "http://localhost:3001"
}
```

then go to captcha configs `src/Components/Home`
**create captcha.json**

create key and client secret on re-captcha website 

```json
{
   "site_key": "XXX-XXX-XXX"    
}
```

then go to `server/`
create **env.json**

```json
{
   "CAPTCHA": "YOUR CLIENT SECRET"
}
```

3) in `env.json` create **"DB_URL"**

```json
{
   "CAPTCHA": "YOUR CLIENT SECRET",
   "DB_URL": "YOUR MONGODB DATA BASE URL"
}
```

and also **"PASSWORD_HASH"**

```json
{
   "CAPTCHA": "YOUR CLIENT SECRET",
   "DB_URL": "YOUR MONGODB DATA BASE URL",
   "PASSWORD_HASH": "LONG PASSWORD HASH"
}
```

4) then run 

### `npm i` and `npm i --save-dev` in main folder

and then same commands in `server/` folder

then run `npm start` in both folders and you are good to go

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b <branch_name>`)
3.  Commit your Changes (`git commit -m "some cool stuff added"`)
4.  Push to the Branch (`git push origin <branch_name>`)
5.  Open a Pull Request

## Contact

> - **[Linkedin](https://www.linkedin.com/in/nikoloz-imerlishvili-576a43203/)**
> - **Discord: callmenikk#0001**
> - **[Twitter](https://twitter.com/callmenikkkk)**
> - **Gmail: formyauto75@gmail.com**

## Contributor

- **[@callmenikk](https://github.com/callmenikk)**
