import { useState } from "react";
import uniqid from "uniqid";
import { validate } from "../../helpers/index";
import "./style.css"


const AdminPanel = () =>{

    
  const [list, setList] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);


  const [todo, setTodo] = useState({
    tittle: '',
    info:'',
    price:'',
    completed: false,
    id: 0
  })

  const [errors, setErrors] = useState({
    tittle: '',
    info:'',
    price:''
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
  
    if (name === "foto") {
      setTodo({
        ...todo,
        [name]: files[0],
      });
  
      setSelectedFile(URL.createObjectURL(files[0]));
    } else {
      setTodo({
        ...todo,
        [name]: value,
      });
    }
  
    const error = validate(name, value);
  
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault()

    if (errors.tittle.length > 0 && errors.info.length > 0 && errors.price.length > 0)  {
      alert('Something went wrong')
    } else {
      
      setList([
        ...list,
        {
          ...todo,
          id: uniqid(),
        },
      ]);

      setTodo({
        tittle: "",
        info: '',
        price:'',
        completed: false,
      });
    }

  }










  return (
    <section className="section">
        <form className="form" onSubmit={handleSubmit}>

            <div className="container">
                    

            <div className="inp">
                <label htmlFor="foto">Məhsulun şəkli: </label>
                <input
                    type="file"
                    name="foto"
                    onChange={handleChange}
                />
                
            </div>
                <div className="inp">
                        <label htmlFor="tittle">Məhsulun adı: </label>
                        <input
                        name="tittle"
                        defaultValue={todo.tittle}
                        value={todo.tittle}
                        onChange={handleChange}
                        />
                        {errors.tittle && <p style={{ color: "red" }}>{errors.tittle}</p>}
                </div>
                <div className="inp">
                        <label htmlFor="info">Məhsul hakkında məlumat: </label>
                        <input
                        name="info"
                        defaultValue={todo.info}
                        value={todo.info}
                        onChange={handleChange}
                        />
                        {errors.info && <p style={{ color: "red" }}>{errors.info}</p>}
                </div>
                <div className="inp">
                        <label htmlFor="price">Məhsulun qiyməti: </label>
                        <input
                        type="number"
                        name="price"
                        defaultValue={todo.price}
                        value={todo.price}
                        onChange={handleChange}
                        />
                        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                    
                </div>

                <button className="btn" type="submit">Add button</button>
            </div>
        </form>

            <div className="products">
                
                {list.map((item) => (
                    <div className="product" key={item.id}>

                    <img
                        src={selectedFile}
                        alt="Selected file preview"
                    />
                    <p>Mehsulun adi : {item.tittle} </p>
                    <p>Mehsulun infosu :{item.info} </p>
                    <p>Mehsulun qiymeti: {item.price}$</p>
                    </div>
                ))}
            </div>
    </section>
  );

}

export default AdminPanel;


