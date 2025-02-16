import React, { useState,useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CreatingListing() {
  const [formData,setFormData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:0,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  })
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const supabase = useSupabaseClient();
  console.log(formData);
  const [files, setFiles] = useState([]);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [uploading, setUploading] = useState(false);
  

  const handleImageSubmit = async () => {
    if (files.length === 0 || files.length > 6) {
      alert("Please select between 1 to 6 images.");
      return;
    }

    setUploading(true);
    try {
      const promises = files.map((file) => storeImage(file));
      const urls = await Promise.all(promises);
      setFormData({...formData,imageUrls:urls});
      console.log("Uploaded Image URLs:", urls);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    }
    setUploading(false);
  };
 
  const storeImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      const filePath = new Date().getTime() + file.name;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        reject(error);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);
        resolve(publicUrlData.publicUrl);
        const urls = await Promise.all(promises);
      setFormData({...formData,imageUrls:urls});
      }
    });
  };
 const handleRemoveImage=(index)=>{
  setFormData({
    ...formData,imageUrls:formData.imageUrls.filter((_,i)=>i!==index)
  })
 }
 const handelChange=(e)=>{
   if(e.target.id==='sale'||e.target.id==='rent'){
    setFormData({
      ...formData,
      type:e.target.id
    })
   }
   if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
    setFormData({
      ...formData,
      [e.target.id]:e.target.checked
    })
   }
   if(e.target.type==='number'||e.target.type==="text"||e.target.type==='textarea'){
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
   }
 }
const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listings/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
      <form onSubmit={handelSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handelChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handelChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="62"
            minLength="10"
            required
            onChange={handelChange}
            value={formData.address}
          />
          <div className="flex gap-4">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handelChange}
            checked={formData.type==='sale'}/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handelChange}
            checked={formData.type==='rent'}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" 
              onChange={handelChange}
              checked={formData.parking}/>
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" 
              onChange={handelChange}
              checked={formData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5"
              onChange={handelChange}
              checked={formData.offer} />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg" 
              onChange={handelChange}
              checked={formData.bedrooms} />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" min="1" max="10" required className="p-3 border border-gray-300 rounded-lg" 
              onChange={handelChange}
              checked={formData.bathrooms} />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regularPrice" min='50'
                max='10000000' required className="p-3 border border-gray-300 rounded-lg" 
              onChange={handelChange}
              checked={formData.regularPrice}/>
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">(rupees/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handelChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images: <span className="font-normal text-gray-600 ml-2">First image will be cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading?'Creating...':'Create Listing'}
          </button>
          {error&&<p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreatingListing;
