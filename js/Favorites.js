export class ApiGithubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint).then(data => data.json()).then(({login, name, public_repos, followers, bio}) => ({
            login, 
            name,
            public_repos,
            followers,
            bio
        }))
    }
}

export class FavoritesUsers {
    constructor(root){
       this.root = document.querySelector(root)
       this.loadingDataUsers()
    }
    
    async addUser(username){
        try{

            if(username == ''){
                throw new Error('Insira nome de um usuário')
            }

            const verifUserExists = this.users.find(user => user.login == username  )

            if(verifUserExists){
                throw new Error('Usuário já inserido')
            }

            const user = await ApiGithubUser.search(username)

            if(user.login == undefined){
                throw new Error('Usuário não encontrado')
            }

            this.users = [user, ...this.users]
            this.updateView()
            this.saveEstorage()
        }catch(error){
            alert(error.message)
        }
    }

    saveEstorage(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.users))
    }

    loadingDataUsers(){
        this.users = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }
}

export class FavoritesViewUsers extends FavoritesUsers{
    constructor(root){
        super(root)
        this.divUser = this.root.querySelector('.class-wrapper')
        this.updateView()
        this.handleAddUser()
    }

    handleAddUser(){
        const btnAddUser = this.root.querySelector('.action-user button')
        btnAddUser.onclick = () => {
            const valueInputSearch = this.root.querySelector('.action-user input').value
            this.addUser(valueInputSearch)
            document.querySelector('.action-user input').value = ''
        }
    }

    updateView(){
       this.removeAllCards()

        this.users.forEach( user  => {
           const data = this.createCard()
           
           data.querySelector('h3').textContent = user.name
           data.querySelector('img').src = `https://github.com/${user.login}.png`
           data.querySelector('img').alt = `Foto de perfil do github do ${user.login}`
           data.querySelector('#repos_user span').textContent = user.public_repos
           data.querySelector('#followers_user span').textContent = user.followers
           data.querySelector('#bio_user').textContent = user.bio

           this.divUser.append(data)
        })
    }

    createCard(){

        const divCard = document.createElement('div')

         divCard.innerHTML = `
                <h3>Marcus Vinicius</h3>
                <img src="https://github.com/maykbrito.png" alt="">
                <p id="repos_user">Repositories:<span>56</span></p>
                <p id="followers_user">Followers:<span>5356</span></p>
                <p id="bio_user"></p>
        `
       return divCard
    }

    
    removeAllCards(){
        this.divUser.querySelectorAll('div').forEach((div) => {
            div.remove()
        })
    }
}
    
