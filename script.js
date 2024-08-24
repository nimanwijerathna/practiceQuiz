document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

document.body.classList.add('dark-mode');

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const subject1Button = document.getElementById('subject1-btn');
const subject2Button = document.getElementById('subject2-btn');

const subjectContainer = document.getElementById('subject-container');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const finalScoreElement = document.getElementById('final-score');
const scoreContainer = document.getElementById('score-container');

let currentQuestionIndex;
let quizScore = 0;
let selectedSubjectQuestions = [];

// Subject Selection
subject1Button.addEventListener('click', () => {
    selectedSubjectQuestions = subject1Questions;
    startQuiz();
});

subject2Button.addEventListener('click', () => {
    selectedSubjectQuestions = subject2Questions;
    startQuiz();
});

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    subjectContainer.classList.add('hide');
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    quizScore = 0;
    finalScoreElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(selectedSubjectQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-button');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(selectedButton, correct);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (correct) {
        quizScore++;
    }

    if (selectedSubjectQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        showFinalScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainerElement.classList.add('hide');
    finalScoreElement.innerText = `You scored ${quizScore} out of ${selectedSubjectQuestions.length}!`;
    finalScoreElement.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    quizScore='';
    if (document.getElementById('right-answers')) {
        document.getElementById('right-answers').innerText = quizScore;
    }
}

// Questions for Subject WCD 1

const subject1Questions = [
    {
        question: 'Question: 1. Which class must a Java servlet extend to handle HTTP requests?',
        answers: [
            { text: 'HttpSession', correct: false },
            { text: 'HttpRequestHandler', correct: false },
            { text: 'HttpServlet', correct: true },
            { text: 'ServletRequest', correct: false },
        ],
    },

    {
        question: 'Question: 2. What method is used to initialize a servlet?',
        answers: [
            { text: 'start()', correct: false },
            { text: 'service()', correct: false },
            { text: 'setup()', correct: false },
            { text: 'init()', correct: true },
        ],
    },
    {
        question: 'Question: 3. Which of the following package contains servlet classes?',
        answers: [
            { text: 'javax.servlet', correct: false },
            { text: 'javax.servlet.http', correct: false },
            { text: 'Both of the above', correct: true },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question: 4. Which method is used to get the parameter value from the request object?',
        answers: [
            { text: 'getParameterValue()', correct: false },
            { text: 'getParameter()', correct: true },
            { text: 'getValue()', correct: false },
            { text: 'requestParameter()', correct: false },
        ],
    },
    {
        question: 'Question: 5. Which file is used to configure servlet mappings in a Java web application?',
        answers: [
            { text: 'servlet-config.xml', correct: false },
            { text: 'Context.xml', correct: false },
            { text: 'web.xml', correct: true },
            { text: 'Application.properties', correct: false },
        ],
    },
    {
        question: 'Question: 6. What is the purpose of a JSP implicit object "out"?',
        answers: [
            { text: 'To handle HTTP requests', correct: false },
            { text: 'To represent the current JSP page', correct: false },
            { text: 'To provide access to the response writer', correct: true },
            { text: 'To manage session attributes', correct: false },
        ],
    },
    {
        question: 'Question: 7. What is the purpose of URL rewriting in servlets?',
        answers: [
            { text: 'To handle HTTP methods', correct: false },
            { text: 'To encode URLs in HTML', correct: false },
            { text: 'To manage session tracking without cookies', correct: true },
            { text: 'To define custom request headers', correct: false },
        ],
    },
    {
        question: 'Question: 8. What is the name of <%= %>?',
        answers: [
            { text: 'Expression', correct: true },
            { text: 'Page Directive', correct: false },
            { text: 'Scriptlet', correct: false },
            { text: 'Declaration', correct: false },
        ],
    },
    {
        question: 'Question: 9. Which method is used to destroy a session?',
        answers: [
            { text: 'invalidateSession()', correct: false },
            { text: 'invalidate()', correct: true },
            { text: 'deleteSession()', false: false },
            { text: 'delete()', correct: false },
        ],
    },
    {
        question: 'Question: 10. What is the purpose of session tracking in a web application?',
        answers: [
            { text: 'To manage servlet lifecycle', correct: false },
            { text: 'To monitor HTTP requests', correct: false },
            { text: 'To track user sessions across multiple requests', correct: true },
            { text: 'To define custom JSP tags', correct: false },
        ],
    },
    {
        question: 'Question: 11. Which method of ServletContextListener is invoked when an Application is initialized?',
        answers: [
            { text: 'contextInitialized()', correct: true },
            { text: 'initialized()', correct: false },
            { text: 'applicationInitialized()', correct: false },
            { text: 'servletInitialized()', correct: false },
        ],
    },
    {
        question: 'Question: 12. Which JSP directive is used to declare global variables and methods in a JSP page?',
        answers: [
            { text: '<%@include %>', correct: false },
            { text: '<%! %>', correct: true },
            { text: '<%= %>', correct: false },
            { text: '<%@taglib %>', correct: false },
        ],
    },
    {
        question: 'Question: 13. Which object allows JSPS to interact with the servlet contexts?',
        answers: [
            { text: 'request', correct: false },
            { text: 'session', correct: false },
            { text: 'response', correct: false },
            { text: 'application', correct: true },
        ],
    },
    {
        question: 'Question: 14. Which HTTP status code indicates that a resource is not found on the server?',
        answers: [
            { text: '200', correct: false },
            { text: '404', correct: true },
            { text: '500', correct: false },
            { text: '302', correct: false },
        ],
    },
    {
        question: 'Question: 15. What is the default session timeout of HTTP Session in minutes?',
        answers: [
            { text: '30', correct: true },
            { text: '60', correct: false },
            { text: '25', correct: false },
            { text: '1800', correct: false },
        ],
    },
    {
        question: 'Question: 16. Which method is called to remove an attribute from a session?',
        answers: [
            { text: 'session.removeAttribute()', correct: true },
            { text: 'session.invalidate()', correct: false },
            { text: 'session.destroy()', correct: false },
            { text: 'session.remove()', correct: false },
        ],
    },
    {
        question: 'Question: 17. What is the purpose of the jsplnit() method in the JSP lifecycle?',
        answers: [
            { text: 'To handle HTTP GET requests sent to the JSP!', correct: false },
            { text: 'To initialize the JSP page and allocate resources', correct: true },
            { text: 'To clean up resources and finalize the JSP page', correct: false },
            { text: 'To destroy the JSP page and release allocated memory', correct: false },
        ],
    },
    {
        question: 'Question: 18. Which implicit object of JSP is equivalent to this variable of Java programming language?',
        answers: [
            { text: 'page', correct: true },
            { text: 'pageContext', correct: false },
            { text: 'config', correct: false },
            { text: 'application', correct: false },
        ],
    },
    {
        question: 'Question: 19. What is the purpose of the @WebServlet annotation in a servlet class?',
        answers: [
            { text: 'To define servlet mappings', correct: true },
            { text: 'To specify initialization parameters', correct: false },
            { text: 'To manage session attributes', correct: false },
            { text: 'To configure HTTP methods', correct: false },
        ],
    },
    {
        question: 'Question 20. Which XML element is used to configure session related configurations in web.xml',
        answers: [
            { text: '<servlet>', correct: false },
            { text: '<servlet-mapping>', correct: false },
            { text: '<session-config>', correct: true },
            { text: '<web-app>', correct: false },
        ],
    },
    {
        question: 'Question 21. What is the purpose of web container?',
        answers: [
            { text: 'To execute JSP pages', correct: false },
            { text: 'To manage servelet lifecycle', correct: true },
            { text: 'To serve static HTML pages', correct: false },
            { text: 'To execute JavaScript code', correct: false },
        ],
    },
    {
        question: 'Question 22. What is the default HTTP method used when submitting a HTML form?',
        answers: [
            { text: 'GET', correct: true },
            { text: 'POST', correct: false },
            { text: 'PUT', correct: false },
            { text: 'DELETE', correct: false },
        ],
    },
    {
        question: `Question 23. What is the output of the following code? 
                                <html>
                                <head></head>
                                <body>
                                <% String out; %>
                                <% out = "ABC"; %>
                                The value is <%= out %>
                                </body>
                                </html>`,
        answers: [
            { text: 'The value is out', correct: false },
            { text: 'Page wont compile', correct: true },
            { text: 'The value is ABC', correct: false },
            { text: 'ABC', correct: false },
        ],
    },
    {
        question: 'Question 24. Which of the following statements is true regarding the include() method in the RequestDispatcher interface?',
        answers: [
            { text: 'It includes the response of another servlet or JSP within the current response', correct: true },
            { text: 'It sends the request to a different servlet or JSP within the same web application', correct: false },
            { text: 'It sends the request to a different web application', correct: false },
            { text: 'It terminates the servlet execution', correct: false },
        ],
    },
    {
        question: 'Question 25. Which method of HttpSessionListener gives notification when a session is created?',
        answers: [
            { text: 'sessionCreated()', correct: true },
            { text: 'sessionStarted()', correct: false },
            { text: 'is New()', correct: false },
            { text: 'It terminates the servlet execution', correct: false },
        ],
    },
    {
        question: 'Question 26. Which method is used to retrieve initialization parameters from a ServletConfig object?',
        answers: [
            { text: 'getParameters()', correct: false },
            { text: 'getServletConfig()', correct: false },
            { text: 'getServletContext()', correct: false },
            { text: 'getInitParameter()', correct: true },
        ],
    },
    {
        question: 'Question 27. What is the purpose of a servlet context parameter in a web application?',
        answers: [
            { text: 'To define session attributes', correct: false },
            { text: 'To configure global settings accessible to all servlets', correct: true },
            { text: 'To manage servlet mappings', correct: false },
            { text: 'To specify JSP directives', correct: false },
        ],
    },
    {
        question: 'Question 28. Never end an expression with a semicolon inside an Expression tag?',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ],
    },
    {
        question: 'Question 29. Which of the following is a correct way of URL Rewriting?',
        answers: [
            { text: 'http://localhost:8080/wcd/profile.jsp+JAVASESSIONID=123', correct: false },
            { text: 'http://localhost:8080/wcd/profile.jsp?JSESSIONID=123', correct: false },
            { text: 'http://localhost:8080/wcd/profile.jsp%PHPSESSID=123', correct: false },
            { text: 'http://localhost:8080/wcd/profile.jsp;JSESSIONID=123', correct: true },
        ],
    },
    {
        question: 'Question 30. Which method is used to access the cookies that are added to the response object?',
        answers: [
            { text: 'getCookies()', correct: true },
            { text: 'getNewCookies();', correct: false },
            { text: 'cookies();', correct: false },
            { text: 'returnCookies():', correct: false },
        ],
    },
    {
        question: 'Question 31. <%! // this is a ............ %>?',
        answers: [
            { text: 'Declaration in a JSP Page', correct: true },
            { text: 'Scriptlet in a JSP Page', correct: false },
            { text: 'Expression in a JSP Page', correct: false },
            { text: 'None of above', correct: false },
        ],
    },
    {
        question: 'Question 32. What is the lifecycle of a servlet?',
        answers: [
            { text: 'Servlet class is loaded', correct: false },
            { text: 'Servlet instance is created', correct: false },
            { text: 'init, Service,destroy method is invoked', correct: false },
            { text: 'All mentioned above', correct: true },
        ],
    },
    {
        question: 'Question 33. Which method is used to send the same request and response objects to another servlet in RequestDispatcher?',
        answers: [
            { text: 'forward()', correct: true },
            { text: 'sendRedirect()', correct: false },
            { text: 'Both A & B', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 34. The sendRedirect() method of HttpServletResponse interface can be used to redirect response to another resource, it may be a servlet, jsp or html file?',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },        
        ],
    },
    {
        question: 'Question 35. Which of the following code delete a cookie in servlet?',
        answers: [
            { text: 'response.deleteCookie(cookie);', correct: false },
            { text: 'cookie.setMaxAge(0);', correct: true },
            { text: 'request.deleteCookie(cookie);', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 36. When the Web Container initializes a servlet, it creates a _______ servlet?',
        answers: [
            { text: 'ServletConfig', correct: true },
            { text: 'ServletInit', correct: false },
            { text: 'ServletContext', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 37. _______ is responsible for managing execution of servlet ?',
        answers: [
            { text: 'Web Container', correct: true },
            { text: 'Servlet Context', correct: false },
            { text: 'JVM', correct: false },
            { text: 'Server', correct: false },
        ],
    },
    {
        question: 'Question 38. Which class provides implementation for service() method?',
        answers: [
            { text: 'GenericServlet', correct: false },
            { text: 'HttpServlet', correct: true },
            { text: 'Servlet', correct: false },
            { text: 'None of the above', correct: false },
        ],
    },
    {
        question: 'Question 39. Which method is called only once in the Servlet life cycle?',
        answers: [
            { text: 'service()', correct: false },
            { text: 'init()', correct: true },
            { text: 'initialize', correct: false },
            { text: 'All of the above', correct: false },
        ],
    },
    {
        question: 'Question 40. Which method define in the HttpServletResponse may be used to set the content?',
        answers: [
            { text: 'setType()', correct: false },
            { text: 'setContent()', correct: false },
            { text: 'setContentType()', correct: true },
            { text: 'None of the above', correct: false },
        ],
    },
];

// Questions for Subject WCD 2
const subject2Questions = [
    {
        question: 'Question: 1. Which of the following is a valid way to iterate over a collection in JSTL?',
        answers: [
            { text: '<c:loop>', correct: false },
            { text: '<c:forEach>', correct: true },
            { text: '<c:iterate>', correct: false },
            { text: '<c:repeat>', correct: false },
        ],
    },
    {
        question: 'Question: 2. Which JSTL tag library is used for SQL database operations?',
        answers: [
            { text: 'Core', correct: false },
            { text: 'XML', correct: false },
            { text: 'SQL', correct: true },
            { text: 'Functions', correct: false },
        ],
    },{
        question: 'Question: 3. What is the purpose of the <sql:query> tag in JSTL?',
        answers: [
            { text: 'To execute SQL statements', correct: true },
            { text: 'To perform XML transformations', correct: false },
            { text: 'To loop through a collection', correct: false },
            { text: 'To set a JavaBean property', correct: false },
        ],
    },
    {
        question: 'Question: 4. Which JSP tag is used to instantiate a JavaBean?',
        answers: [
            { text: '<jsp:useBean>', correct: true },
            { text: '<jsp:setBean>', correct: false },
            { text: '<jsp:getBean>', correct: false },
            { text: '<jsp:bean>', correct: false },
        ],
    },
    {
        question: 'Question: 5. What is the default scope for a JavaBean created with <jsp:useBean>?',
        answers: [
            { text: 'Page', correct: true },
            { text: 'Request', correct: false },
            { text: 'Session', correct: false },
            { text: 'Application', correct: false },
        ],
    },
    {
        question: 'Question: 6. Consider the following segment in a servlet, request.getSession().setAttribute("param", "value"); How to access the "param" via EL in a JSP?',
        answers: [
            { text: '${session.param}', correct: false },
            { text: '${param}', correct: false },
            { text: '${sessionScope.param}', correct: true },
            { text: '${param.value}', correct: false },
        ],
    },    
    {
        question: 'Question: 7. Which of the following scopes exists only for the duration of the request?',
        answers: [
            { text: 'page', correct: false },
            { text: 'request', correct: true },
            { text: 'session', correct: false },
            { text: 'application', correct: false },
        ],
    },
    {
        question: 'Question: 8. In JSP, which scope can be shared across multiple requests and sessions?',
        answers: [
            { text: 'page', correct: false },
            { text: 'request', correct: false },
            { text: 'session', correct: false },
            { text: 'application', correct: true },
        ],
    },{
        question: 'Question: 9. Which attribute is used to set a session scope for a bean in a JSP page?',
        answers: [
            { text: 'sessionScope', correct: false },
            { text: 'scope="session', correct: true },
            { text: 'scope="page"', correct: false },
            { text: 'sessionld', correct: false },
        ],
    },
    {
        question: 'Question: 10. Which tag should be used to set a property of a JavaBean in a JSP page?',
        answers: [
            { text: '<jsp:setProperty>', correct: true },
            { text: '<jsp:property>', correct: false },
            { text: '<jsp:configProperty>', correct: false },
            { text: '<jsp:getProperty>', correct: false },
        ],
    },
    {
        question: 'Question: 11. Which of the following is a feature of JavaBeans?',
        answers: [
            { text: 'Serializable', correct: false },
            { text: 'Public no-argument constructor', correct: false },
            { text: 'Getter and setter methods', correct: false },
            { text: 'All of the above', correct: true },
        ],
    },{
        question: 'Question: 12. What happens if you try to instantiate a bean that already exists in the same scope?',
        answers: [
            { text: 'A new instance is created', correct: false },
            { text: 'The existing bean is reused', correct: true },
            { text: 'The JSP page throws an exception', correct: false },
            { text: 'The page fails to compile', correct: false },
        ],
    },
    {
        question: 'Question: 13. If you attempt to run a JSP that contains a coding error, the server typically returns an error page with HTTP Status?',
        answers: [
            { text: '404', correct: false },
            { text: '202', correct: false },
            { text: '500', correct: true },
            { text: '302', correct: false },
        ],
    },
    {
        question: 'Question: 14. Which of these represent the correct path for the core JSTL library?',
        answers: [
            { text: 'http://java.sun.com/jsp/jstl/core', correct: true },
            { text: 'http://java.sun.com/jsp/core', correct: false },
            { text: 'http://java.sun.com/core', correct: false },
            { text: 'http://java.sun.com/jsp/jstl1.1/core', correct: false },
        ],
    },{
        question: 'Question: 15. What gets printed when the following expression is evaluated? ${(1==2)? 4:5}',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: '4', correct: false },
            { text: '5', correct: true },
        ],
    },
    {
        question: 'Question: 16. What gets printed when the following expression is evaluated? ${4 div 5}',
        answers: [
            { text: '0', correct: false },
            { text: '0.8', correct: true },
            { text: '1', correct: false },
            { text: '-1', correct: false },
        ],
    },
    {
        question: 'Question: 17. What gets printed when the following expression is evaluated? ${12 % 4}',
        answers: [
            { text: '0', correct: true },
            { text: '3', correct: false },
            { text: '8', correct: false },
            { text: '16', correct: false },
        ],
    },
    {
        question: `Question: 18. How many numbers are printed when the following JSTL code fragment is executed? 
        <%@taglib uri=".../core" prefix="c" %>
        <c:forEach var="item" begin="0" end="10" step="2">
        \${item}
        </c:forEach>?`,
        answers: [
            { text: '1', correct: false },
            { text: '5', correct: false },
            { text: '6', correct: true },
            { text: '11', correct: false },
        ],
    },
    {
        question: `Question: 19. Which numbers get printed when the following JSTL code fragment is executed? 
        <%@ taglib uri=".../core" prefix="c" %>
        <c:set var="j" value="4,3,2,1"/>
        <c:forEach items="\${j}" var="item" begin="1" end="2">
        <c:out value="\${item}" default="abc"/>
        </c:forEach>`,
        answers: [
            { text: 'abc', correct: false },
            { text: '2 3', correct: false },
            { text: '3 2', correct: true },
            { text: '3', correct: false },
        ],
    },
    {
        question: `Question: 20. What is the output of the following JSP code?
        <c:set var="x" value="5"/>
        <c:out value="\${x * 2}"/>`,
        answers: [
            { text: '10', correct: true },
            { text: '5', correct: false },
            { text: '25', correct: false },
            { text: 'Error', correct: false },
        ],
    },    
    {
        question: 'Question: 21. When we create a custom Handler class for a custom Tag Library, which class should be extended?',
        answers: [
            { text: 'TagHandler', correct: false },
            { text: 'Simple TagSupport', correct: true },
            { text: 'CustomHandler', correct: false },
            { text: 'Simple Tag', correct: false },
        ],
    },
    {
        question: `Question: 22. To include HTML or JSP files within a JSP at runtime, you can use a/an ______ import tag.`,
        answers: [
            { text: 'JSP', correct: false },
            { text: 'Scriptlet', correct: false },
            { text: 'Bean', correct: false },
            { text: 'JSTL', correct: true },
        ],
    },
    {
        question: `Question: 23. What is the purpose of the <jsp:forward> tag in JSP?`,
        answers: [
            { text: 'To forward the request to another resource', correct: true },
            { text: 'To handle exceptions', correct: false },
            { text: 'To create a new session', correct: false },
            { text: 'To redirect the user to a new URL', correct: false },
        ],
    },
    {
        question: `Question: 24. Which attribute in <sql:query> specifies the database connection?`,
        answers: [
            { text: 'connection', correct: false },
            { text: 'dataSource', correct: true },
            { text: 'connectionSource', correct: false },
            { text: 'dbConnection', correct: false },
        ],
    },
    {
        question: `Question: 25. Which attribute is used to specify the error page?`,
        answers: [
            { text: 'isErrorPage', correct: false },
            { text: 'errorPage', correct: true },
            { text: 'errorPages', correct: false },
            { text: 'for Error', correct: false },
        ],
    },
    {
        question: `Question: 26. What happens when an uncaught exception is thrown in a JSP page with an errorPage directive?`,
        answers: [
            { text: 'The error page specified is displayed', correct: true },
            { text: 'The server shuts down', correct: false },
            { text: 'The user is redirected to the homepage', correct: false },
            { text: 'The exception is ignored', correct: false },
        ],
    },
    {
        question: `Question: 27. Which tag is used to handle exceptions in JSP?`,
        answers: [
            { text: '<jsp:captureException>', correct: false },
            { text: '<jsp:handleException>', correct: false },
            { text: '<jsp:error>', correct: false },
            { text: '<c:catch>', correct: true },
        ],
    },
    {
        question: `Question: 28. To include a file in a JSP at compile-time, you can use the _____ directive.`,
        answers: [
            { text: 'set', correct: false },
            { text: 'parse', correct: false },
            { text: 'include', correct: true },
            { text: 'append', correct: false },
        ],
    },
    {
        question: `Question: 29. A/an ________ is a special type of object that provides a standard way to access its properties.`,
        answers: [
            { text: 'PageBean', correct: false },
            { text: 'JavaBean', correct: true },
            { text: 'ServletBean', correct: false },
            { text: 'XmlBean', correct: false },
        ],
    },
    {
        question: `Question: 30. Which JSTL SQL tag is used to update data in the database?`,
        answers: [
            { text: '<sql:update>', correct: true },
            { text: '<sql:modify>', correct: false },
            { text: '<sql:execute>', correct: false },
            { text: '<sql:change>', correct: false },
        ],
    },
    {
        question: `Question: 31. In which deployment descriptor element is a filter mapped to a servlet or URL pattern?`,
        answers: [
            { text: '<filter>', correct: false },
            { text: '<filter-mapping>', correct: true },
            { text: '<servlet>', correct: false },
            { text: '<listener>', correct: false },
        ],
    },
    {
        question: `Question: 32. What does the FilterChain interface represent?`,
        answers: [
            { text: 'A single filter in the filter chain', correct: false },
            { text: 'The sequence of filters applied to a request/response', correct: true },
            { text: 'The container for all servlets in a web application', correct: false },
            { text: 'The request-response lifecycle manager', correct: false },
        ],
    },
    {
        question: `Question: 33. Assuming the standard JSTL prefix conventions are used, which JSTL tags would you use to iterate over a collection of objects?`,
        answers: [
            { text: '<c:for>', correct: false },
            { text: '<c:iterate>', correct: false },
            { text: '<c:forEach>', correct: true },
            { text: '<c:forTokens>', correct: false },
        ],
    },
    {
        question: `Question: 34. What is the default value of the session attribute in the page directive?`,
        answers: [
            { text: 'false', correct: false },
            { text: 'true', correct: true },
            { text: 'null', correct: false },
            { text: 'undefined', correct: false },
        ],
    },
    {
        question: `Question: 35. Which of the following is the default contentType value in a JSP page?`,
        answers: [
            { text: 'text/plain', correct: false },
            { text: 'text/xml', correct: false },
            { text: 'text/html', correct: true },
            { text: 'application/json', correct: false },
        ],
    },
    {
        question: `Question: 36. What is the purpose of the <taglib> directive in a JSP page?`,
        answers: [
            { text: 'To declare the use of a custom tag library in the JSP page', correct: true },
            { text: 'To include a tag file in the JSP page', correct: false },
            { text: 'To define a custom tag', correct: false },
            { text: 'To forward a request to another JSP page', correct: false },
        ],
    },
    {
        question: `Question: 37. What does the body-content element specify in a TLD file?`,
        answers: [
            { text: 'The content type of the tag body', correct: false },
            { text: 'Whether the tag can have a body and what it contains', correct: true },
            { text: 'The URI of the tag library', correct: false },
            { text: 'The handler class for the custom tag', correct: false },
        ],
    },
    {
        question: `Question: 38. In the MVC pattern, which component is responsible for handling user input?`,
        answers: [
            { text: 'Model', correct: false },
            { text: 'View', correct: false },
            { text: 'Controller', correct: true },
            { text: 'Dispatcher', correct: false },
        ],
    },
    {
        question: `Question: 39. Which function in JSTL is used to trim leading and trailing whitespace from a string?`,
        answers: [
            { text: 'fn:substring', correct: false },
            { text: 'fn:toUpperCase', correct: false },
            { text: 'fn:trim', correct: true },
            { text: 'fn:replace', correct: false },
        ],
    },
    {
        question: `Question: 40. To replace occurrences of a substring within a string using JSTL, which function is used?`,
        answers: [
            { text: 'fn:substring', correct: false },
            { text: 'fn:replace', correct: true },
            { text: 'fn:split', correct: false },
            { text: 'fn:trim', correct: false },
        ],
    },
    
];