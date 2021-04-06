# Code Review

1.

```js
const data = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
];

const values = data.reduce((values, { value }) => {
  values.push(value);
  return values;
}, []);
```
Recommandation : bien que le code fonctionne, l'utilisation d'une fonction reduce est inutile.  Une fonction map serait beaucoup plus logique pour retourner les valeurs dans un array, si tel est l'objectif.

Recommendation: although the code does work, the use of a reduce function is unnessasary and verbose, a map function would be much more logical to return the values into an array, if that is the perpose.

```js
const values = data.map(({ value }) => value);

```

2. 

```js
async function getIndexes() {
   return await fetch('https://api.coingecko.com/api/v3/indexes').then(res => res.json());
}

async function analyzeIndexes() {
   const indexes = await getIndexes().catch(_ => {
      throw new Error('Unable to fetch indexes');
   });
   return indexes;
}
```
Le modèle Promise et le modèle async await semblent avoir été mélangés et assortis. 
Recommandation : soit utiliser un format async, soit chain promises.

Promise pattern and async await pattern seems to have been mixed and matched. 
Recommendation: either use an async format or chain promises

```js
const getIndexes = () => fetch('https://api.coingecko.com/api/v3/indexes')
.then(res => res.json())
.catch(_ => {
    throw new Error('Unable to fetch indexes');
});

const analyzeIndexes = async () => {
    try {
        const indexes = await getIndexes();
        return indexes;
    } catch(error) {
        throw new Error(error);
    }
}

```

3. 

```js
let state;
const user = getUser();
if (user) {
   const project = getProject(user.id);
   state = {
      user,
      project
   };
} else {
   state = {
      user: null,
      project: null
   };
}
ctx.body = state;
```

4. 

```js
function getQueryProvider() {
  const url = window.location.href;
  const [_, provider] = url.match(/provider=([^&]*)/);
  if (provider) {
     return provider;
  }
  return;
}
```

5. 

```js
function getParagraphTexts() {
   const texts = [];
   document.querySelectorAll("p").forEach(p => {
      texts.push(p);
   });
   return texts;
}
```
Recommandation : le code pourrait être simplifié en utilisant une fonction map.

Recommendation: code could be simplified by using a map function

```js
function getParagraphTexts() {
    return document.querySelectorAll("p").map(p => p);
}
```

6. 

```js
function Employee({ id }) {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [employee, setEmployee] = useState({});

   useEffect(() => {
      getEmployee(id)
         .then(employee => {
            setEmployee(employee);
            setLoading(false);
         })
         .catch(_ => {
            setError('Unable to fetch employee');
            setLoading(false);
         });
   }, [id]);

   if (error) {
      return <Error />;
   }

   if (loading) {
      return <Loading />;
   }

   return (
      <Table>
         <Row>
            <Cell>{employee.firstName}</Cell>
            <Cell>{employee.lastName}</Cell>
            <Cell>{employee.position}</Cell>
            <Cell>{employee.project}</Cell>
            <Cell>{employee.salary}</Cell>
            <Cell>{employee.yearHired}</Cell>
            <Cell>{employee.wololo}</Cell>
         </Row>
      </Table>
   );
}
```

7. 

```js
async function getFilledIndexes() {
   try {
      const filledIndexes = [];
      const indexes = await getIndexes();
      const status = await getStatus();
      const usersId = await getUsersId();
      
      for (let index of indexes) {
         if (index.status === status.filled && usersId.includes(index.userId)) {
            filledIndexes.push(index);
         }
      }
      return filledIndexes;
   } catch(_) {
      throw new Error ('Unable to get indexes');
   }
}
```

8. 

```js
function getUserSettings(user) {
   if (user) {
      const project = getProject(user.id);
      if (project) {
         const settings = getSettings(project.id);
         if (settings) {
            return settings;
         }
      }
   }
   return {};
}
```
Recommandation : même si le code est correct, il pourrait être simplifié en utilisant une If statement.

Recommendation: Even if the code is correct it may be simplified by using one if statement

```js
function getUserSettings(user) {
    const project = getProject(user.id);
    const settings = getSettings(project.id);
    if (settings) {
        return settings;
    }
    return {};
}
```