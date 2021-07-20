console.log('hello');
getUser(1,getRepositories); 

// console.log(user)
console.log('Biro');

function getRepositories(user){
    getRepositories(user.GitHubUsername,getCommits)
}

function getCommits(repos){
    getCommits(repo, displayCommits);
}


function displayCommits (commits){
    console.log(commits);
}


function getUser (id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log('Reading user from database...');
    
        resolve({id:id,GitHubUsername:'Sumit'});
        },2000)  
    })    
}


function getRepositories (username){
    return new Promise ((resolve,reject)=>{
        setTimeout(()=> {
            resolve(['repo1', 'repo 2']);
        },4000)    
    })
    
}