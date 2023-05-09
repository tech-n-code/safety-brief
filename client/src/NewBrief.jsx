import { useState, useEffect } from 'react';

function NewBrief(props) {
    const [briefTitle, setBriefTitle] = useState('');
    const [categoryAmounts, setCategoryAmounts] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => {
            console.log(data); // categories data
            })
            .catch(error => {
            console.error(error);
            });
    }, []);

    const handleInputChange = (e, category) => {
        setCategoryAmounts({ ...categoryAmounts, [category]: parseInt(e.target.value) });
    };

    const handleCreateBrief = async (title, user_id) => {
        const response = await fetch('/api/safety-brief/briefs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, user_id })
        })
        if (!response.ok) {
            console.log('Failed to add favorite');
        }
    };

  return (
    <div className="container mx-6 pt-20">

        <label className="text-xl font-bold" htmlFor="brief-title">Brief Title:</label>
        <input className="input input-primary w-full max-w-xs mx-3" type="text" placeholder="Type here" id="brief-title" value={briefTitle} onChange={e => setBriefTitle(e.target.value)} />

        {categories.map(category => (
            <div key={category.id}>
                <label htmlFor={`category-${category.id}`}>{category.name}:</label>
                <input type="number" id={`category-${category.id}`} value={categoryAmounts[category.name] || 0} onChange={e => handleInputChange(e, category.name)} />
            </div>
        ))}

      <button onClick={handleCreateBrief}>Create Brief</button>
    </div>
  );
}

export default NewBrief;