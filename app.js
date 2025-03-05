document.addEventListener('DOMContentLoaded', function() {

    const caseStudySection = document.querySelector('.case-study');
    caseStudySection.style.display = 'none';
    
    const cards = document.querySelectorAll('.card .bg');
    
    const body = document.querySelector("body");

    cards.forEach(card => {
        card.addEventListener('click', function() {

            caseStudySection.style.display = 'block';
            caseStudySection.scrollTo(0, 0);
            body.classList.add("no-scroll");
            
            const cardCount = caseStudySection.querySelector('.case-count');
            const cardIdentifier = caseStudySection.querySelector('.case-title');
            
            if (this.querySelector('#ec')) {
                cardCount.textContent = "01.";
                cardIdentifier.textContent = "Envision Center";
            } else if (this.querySelector('#portfolio')) {
                cardCount.textContent = "02.";
                cardIdentifier.textContent = "Friendly Portfolio";
            } else if (this.querySelector('#CDH')) {
                cardCount.textContent = "03.";
                cardIdentifier.textContent = "CDH Linux Terminal";
            }
            
            const closeButton = caseStudySection.querySelector('.close-button');
            closeButton.addEventListener('click', function() {
                caseStudySection.style.display = 'none';
                body.classList.remove('no-scroll');
            })
            // caseStudySection.innerHTML = `
            //     <div class="case-study-content">
            //         <button class="close-btn">&times;</button>
            //         <h2>${cardIdentifier}</h2>
            //         <p>Detailed information about ${cardIdentifier} project will go here.</p>
            //     </div>
            // `;
            
            // const closeBtn = caseStudySection.querySelector('.close-btn');
            // closeBtn.addEventListener('click', function() {
            //     caseStudySection.style.display = 'none';
            // });
        });
    });
});