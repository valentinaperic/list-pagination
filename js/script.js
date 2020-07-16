/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentList = document.querySelector('.student-list').querySelectorAll('li');
const itemsPerPage = 10;
const initPageNumber = 1;

/**
 * display students on selected page 
 * @param list 
 * @param page 
 */

const showPage = (list, page) => {

  //student page indexes
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  
  //go through student page list and show/hide students based on indexes
  list.forEach((studentListItem, index) => {
     (index >= startIndex && index < endIndex) ? studentListItem.style.display = '' : studentListItem.style.display = 'none';
   });
}

/**
 * create pagination buttons
 * @param list 
 */

const appendPageLinks = (list) => {

   //calculates the total page numbers 
   const totalPageNumber = Math.ceil(list.length / itemsPerPage);

   //create the pagination html
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div'); 
   paginationDiv.className = "pagination";
   pageDiv.append(paginationDiv);
   
   const paginationUL = document.createElement('ul'); 
   paginationDiv.appendChild(paginationUL);      

   for (let i = 1; i <= totalPageNumber; i++) {

      const paginationLI = document.createElement('li');
      const paginationA = document.createElement('a');

      paginationA.innerText = i;
      paginationA.href = "#";

      //add active class to the first pagination link
      (i == 1) ? paginationA.className = "active" : paginationA.className = "";

      paginationUL.appendChild(paginationLI);
      paginationLI.appendChild(paginationA);
   }

   let paginationLinks = document.getElementsByTagName("a");

   //click event for the pagination
   for (let link of paginationLinks) {
      link.addEventListener('click',
         function (event) {
            event.preventDefault();
            let pageNumber = link.innerText;
            //handle active class
            activeClassHandler(link, paginationLinks);
            //display students
            showPage(studentList, pageNumber);
        }, 
      false);
   }
};

/**
 * adds active class to link clicked and removes all the other active classes
 * @param currentLink 
 * @param links 
 */

const activeClassHandler = (currentLink, links) => {
   for (let link of links) {
      link.classList.remove('active');
   }

   //set current link as active
   currentLink.className = "active";
};

showPage(studentList, initPageNumber);
appendPageLinks(studentList);