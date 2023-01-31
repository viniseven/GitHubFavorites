export class FavoritesUsers {
    constructor(root){
       this.root = document.querySelector(root)
       this.loading() 
    }

    loading(){
        this.users = [
            {
            login: 'viniseven',
            name: 'Marcus Vinícius',
            repositories: 25,
            followers: 110,
            email: 'marcusv892@gmail.com'  
            },
            {
            login: 'diego3g',
            name: 'Diego Fernandes',
            repositories: 42,
            followers: 1423,
            email: 'diegofer3g@gmail.com'  
            }
        ] 
    }
}

export class FavoritesViewUsers extends FavoritesUsers{
    constructor(root){
        super(root)
        this.updateview()
    }

    updateview(){
       this.removeAllCards()

        this.users.forEach( user  => {
           const data = this.createCard()
           console.log(data)
        })
    }

    createCard(){

        const divCard = document.createElement('div')

         divCard.innerHTML = `
                <h3>Marcus Vinicius</h3>
                <img src="https://github.com/maykbrito.png" alt="">
                <p>Repositories:<span>56</span></p>
                <p>Followers:<span>5356</span></p>
                <p>Email:<span>maykbrito.dev@gmail.com</span></p>
        `
       return divCard
    }

    
    removeAllCards(){
        const divUser = this.root.querySelector('.class-wrapper')

        divUser.querySelectorAll('div').forEach((div) => {
            div.remove()
        })
    }
}
    
