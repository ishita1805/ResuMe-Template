// dynamically add data to html file

// declaring variables
var user_name = $('#p-name')
var user_tag = $('#p-tag')
var about = $('#about-text')
var work = $('#work')
var projects = $('#project-cont')
var volunteer = $('#volunteer')
var skills = $('#skills-cont')
var footer = $('#footer')
var git = $('#github')
var lin = $('#linkedin')
var navigation = $('#navigation')
var aboutMain = $('#about')
var education = $('#education')
var certification = $('#certifications')
var skillsMain = $('#skills')
var workMain = $('#experiences')
var volunteerMain = $('#volunteering')
var projectsMain = $('#projects')

// load json file
fetch('data.json')
.then(response=>response.json())
.then((result)=>{
    // append data to html

    // user profile data
    user_name.text('I am '+result['profile']['name'])
    user_tag.text(result['profile']['headline']+' from '+result['profile']['location'])
    git.attr("href", result['social'][1])
    lin.attr("href", result['social'][0])

    // about
    if(result['about'] && result['about'] !== ''){ 
        about.text(result['about'])
        navigation.append("<li class='nav-items'><a href='#about'>About</a></li>")
    }
    else {
        aboutMain.remove()
    }

    // education
    if(result['education'] && result['education'].length>0){
        result['education'].forEach(element => {
            let body = '';
            if(element['body']) {
                element['body'].map((item) => {
                    body += `<p>${item}</p>`
                })
            }
            var edu = `<div class='education-cont'>
                            ${element['institute']?`<h3>${element['institute']}</h3>`:''}
                            ${body !== ''?body:''}
                        </div>`
            education.append(edu)
        });
    }
    else {
        education.remove()
    }

    // skills
    if(result['skills'] && result['skills'].length>0){
        result['skills'].forEach(element => {
            var skill = ` <li>${element}</li>`
            skills.append(skill)
        });
        navigation.append(" <li class='nav-items'><a href='#skills'>Skills</a></li>")
    } 
    else {
        skillsMain.remove()
    }

    // experience
    if(result['experience'] && result['experience'].length > 0){
        result['experience'].forEach(element => {
            let body = '';
            if(element['body']) {
                element['body'].map((item) => {
                    body += `<p>${item}</p>`
                })
            }
            let roles = '';
            if(element['roles']) {
                element['roles'].map((item) => {
                    let role = '';
                    item.map((el,index) => {
                        if(index === 0) {
                            role += `<p><b>${el}</b></p>`
                        } else {
                            role += `<p>${el}</p>`
                        }
                        
                    })
                    roles += `<div class='exp-role'>${role}</div>`
                })
            }

            if(element['roles']){
                var exp = `<div class='exp'>
                                <div class='exp-bullet'></div>
                                <div class='exp-col'>
                                    ${element['heading']?`<h3>${element['heading']}</h3>`:''}  
                                    ${roles !== ''? roles: ''}
                                </div>
                            </div>`
                work.append(exp)
            }
            else {
                var exp = `<div class='exp'>
                            <div class='exp-bullet'></div>
                            <div class='exp-col'>
                                    ${element['heading']?`<h3>${element['heading']}</h3>`:''}   
                                    ${body !== ''? body: ''}
                            </div>
                        </div>`
                work.append(exp)
            }
        });
        navigation.append(" <li class='nav-items'><a href='#experiences'>Work</a></li>")
    }
    else {
        workMain.remove()
    }

    // projects
    github_id = result['social'][1].replace('https://github.com/','')
    fetch(`https://api.github.com/users/${github_id}/repos`)
    .then(response => response.json())
    .then(resp => {
        if(resp.length>0){
            resp.forEach(element => {  
                let el_topics = element.topics.filter((x) => x !== 'resume-cli');

                if(element.fork === false && element.topics.includes("resume-cli")){
                    topics = '';
                    el_topics.map(item => {
                        topics += `<div class='project-topic'>${item}</div>`              
                    })
                    var project = `<div class='project-card'>
                                    <div class='project-card-inner'>
                                        <b>${element.name}</b>
                                        <p>Language: ${element.language===null?'Other':element.language}</p>
                                        ${element.description?`<p class='project-text'>
                                            ${element.description}
                                        </p>`:''}
                                        <div class='project-card-topics'>
                                            ${topics !==''?topics:''}
                                        </div>
                                    </div>
                                    
                                    <div class='project-card-footer'>
                                        <a href='${element.html_url}' target='__blank'><img class='icon' src='./assets/github.png'/></a>
                                        <a href='${element.html_url}' target='__blank'><img class='icon' src='./assets/star.png'/>&ensp;${element.stargazers_count}</a>
                                        <a href='${element.html_url}' target='__blank'><img class='icon' src='./assets/eye.png'/>&ensp;${element.watchers_count}</a>
                                    </div>
                                    </div>`
                    projects.append(project)
                }
            });
            navigation.append("<li class='nav-items'><a href='#projects'>Projects</a></li>")
        } else{
            projectsMain.remove()
        }
    })

    // volunteering
    if(result['volunteer'] && result['volunteer'].length > 0){
        result['volunteer'].forEach(element => {
            console.log(element["role"]);
            body = '';
            element["body"].map((item) => {
                body += `<p>${item}</p>`
            })
            var volun = `<div class='exp'>
                            <div class='exp-bullet'></div>
                            <div class='exp-col'>
                                ${element["role"]?`<h3>${element["role"]}</h3>`:''}
                                ${element["organization"]?`<b>${element["organization"]}</b>`:''}
                                ${body?body:''}
                            </div>
                        </div>`
            volunteer.append(volun)
        });
        navigation.append("<li class='nav-items'><a href='#volunteering'>Volunteering</a></li>")
    }
    else {
        volunteerMain.remove()
    }

    // footer
    footer.text('Made using ResuME - Website Generator')

    // certifications
    if(result['certifications'] && result['certifications'].length > 0){
        result['certifications'].forEach(element => {
            body = '';
            element["body"].map((item) => {
                body += `<p>${item}</p>`
            })
            var cer = `<div class='education-cont'>
                            ${element['course']?`<h3>${element['course']}</h3>`:''}
                            ${element['organization']?`<p><b>${element['organization']}</b></p>`:''}
                            ${body?body:''}
                        </div>`
                        certification.append(cer)
        });
    }
    else {
        certification.remove()
    }
    
})