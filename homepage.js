const editUserName = document.getElementById('edit-user-name');
const editFirstName = document.getElementById('edit-first-name');
const editLastName = document.getElementById('edit-last-name');
const editAge = document.getElementById('edit-age');
const editEmail = document.getElementById('edit-email');
const editPassword = document.getElementById('edit-password');
const editConfirmPassword = document.getElementById('edit-confirm-password');

const form = document.getElementById('add-new-shift-input');
const input = document.getElementById('new-shift-input');
const myShiftsBtn = document.getElementById('myShifts-button');
const list_el = document.getElementById('shifts');
const logout = document.getElementById('logout');
const shiftEdit = document.getElementById('shift-edit');
const editProfileBtn = document.getElementById('edit-profile-button');
const editProfileForm = document.getElementById('edit-profile-form');
const updateProfileBtn = document.getElementById('update-profile-button');
const helloUser = document.getElementById('hello-user');


window.addEventListener('load', (e) =>{ //dupa ce se incarca el de window
	e.preventDefault();


	// USER INFORMATION WILL BE SAVE TO LOCAL STORAGE FOR 60 MIN

	for(let key in localStorage){
		let data = localStorage.getItem(key);
		data = JSON.parse(data);

	if(data){
		if(data.loggedOn){
			window.addEventListener('load', () =>{
				setInterval(function () {
					let hours = 1;
					let now = new Date().getTime();
					let setupTime = localStorage.getItem('setupTime');
					if(setupTime == null){
						localStorage.setItem('setupTime', now)
					}else{
						if(now-setupTime > hours*60*60*1000){
							localStorage.removeItem(user.username);
							localStorage.clear();
							localStorage.setItem('setupTime', now);
			
							window.location.href = 'login.html';
						}
					}
			
				}, 1000);
			})
			let shifts = data.shift;

			for(let shift of shifts){
				if(shift.shiftName){
					createShiftSlug(shift.shiftName, false);

					document.getElementById('comments_'+shift.shiftName).value = shift.comments;
					document.getElementById('hourlyWage_'+shift.shiftName).value = shift.hourlyWage;

					let shiftSlug2 = document.getElementById('slug_'+shift.shiftName);
					setSelectedValue(shiftSlug2, shift.shiftSlug);

					let workplace2 = document.getElementById('workplace_'+shift.shiftName);
					setSelectedValue(workplace2, shift.workplace);

					document.getElementById('workplace_'+shift.shiftName).lastChild.value = shift.startShift;
					document.getElementById('end_shift_'+shift.shiftName).lastChild.value = shift.endShift;
				}
			}

			editUserName.value = data.username;
			editFirstName.value = data.firstName;
			editLastName.value = data.lastName;
			editAge.value = data.age;
			editEmail.value = data.email;
			editPassword.value = data.password;
			editConfirmPassword.value = data.editConfirmPassword;

			helloUser.value = data.username;
		}
	}
	}

	logout.addEventListener('click', e => {
		window.location.href = 'login.html';
	})

	myShiftsBtn.addEventListener('click', (e) =>{
		shiftEdit.style.display = 'block';
		editProfileForm.style.display = 'none';
	})

	myShiftsBtn.addEventListener('dblclick', (e) =>{
		shiftEdit.style.display = 'none';
	})


	//CREATING SHIFT ELEMENTS DYNAMICALLY

	function createShiftSlug(shiftName1,saved){
		const shift_el = document.createElement('div');
	
			shift_el.classList.add('shift');
			shift_el.setAttribute('id','shift_'+shiftName1);
	
			const shift_content_el = document.createElement('div');
			shift_content_el.classList.add('content');
			if(saved)
			{
			shift_content_el.setAttribute('saved','false');
			}
	
			shift_el.appendChild(shift_content_el);
	
			const shift_input_el = document.createElement('input');
			shift_input_el.classList.add('text');
			shift_input_el.type = 'text';
			shift_input_el.value = shiftName1;
			shift_input_el.setAttribute('id','name_'+shiftName1);
			shift_input_el.setAttribute('readonly', 'readonly');
	
			shift_content_el.appendChild(shift_input_el);
	
			//SHIFT-SLUG
			const shift_slug = document.createElement('select');
			shift_slug.classList.add('shift-slug');
			shift_slug.setAttribute('id','slug_'+shiftName1)
	
			shift_content_el.appendChild(shift_slug);
	
			const shift_slug_option_A = document.createElement('option');
			shift_slug_option_A.classList.add('shift-slug-option');
			shift_slug_option_A.innerHTML = 'shift A';
			
			const shift_slug_option_B = document.createElement('option');
			shift_slug_option_B.classList.add('shift-slug-option');
			shift_slug_option_B.innerHTML = 'shift B';
	
			const shift_slug_option_C = document.createElement('option');
			shift_slug_option_C.classList.add('shift-slug-option');
			shift_slug_option_C.innerHTML = 'shift C';
	
			const shift_slug_option_D = document.createElement('option');
			shift_slug_option_D.classList.add('shift-slug-option');
			shift_slug_option_D.innerHTML = 'shift D';
	
			const shift_slug_option_E = document.createElement('option');
			shift_slug_option_E.classList.add('shift-slug-option');
			shift_slug_option_E.innerHTML = 'shift E';
	
			shift_slug.appendChild(shift_slug_option_A);
			shift_slug.appendChild(shift_slug_option_B);
			shift_slug.appendChild(shift_slug_option_C);
			shift_slug.appendChild(shift_slug_option_D);
			shift_slug.appendChild(shift_slug_option_E);
		
	
			//WORKPLACE
			const workplace = document.createElement('select');
			workplace.classList.add('workplace');
			workplace.setAttribute('id','workplace_'+shiftName1)
	
			shift_content_el.appendChild(workplace);
	
			const workplace_option_A = document.createElement('option');
			workplace_option_A.classList.add('workplace_option');
			workplace_option_A.innerHTML = 'workplace A';
	
			const workplace_option_B = document.createElement('option');
			workplace_option_B.classList.add('workplace_option');
			workplace_option_B.innerHTML = 'workplace B';
	
			const workplace_option_C = document.createElement('option');
			workplace_option_C.classList.add('workplace_option');
			workplace_option_C.innerHTML = 'workplace C';
	
			const workplace_option_D = document.createElement('option');
			workplace_option_D.classList.add('workplace_option');
			workplace_option_D.innerHTML = 'workplace D';
	
			const workplace_option_E = document.createElement('option');
			workplace_option_E.classList.add('workplace_option');
			workplace_option_E.innerHTML = 'workplace E';
	
			workplace.appendChild(workplace_option_A);
			workplace.appendChild(workplace_option_B);
			workplace.appendChild(workplace_option_C);
			workplace.appendChild(workplace_option_D);
			workplace.appendChild(workplace_option_E);
	
			//START-END-SHIFT
			const start_end_shift = document.createElement('div');
			start_end_shift.classList.add('start-end-shift');
	
			shift_content_el.appendChild(start_end_shift);
	
			const start_shift = document.createElement('div');
			start_shift.classList.add('start-shift');
			start_shift.setAttribute('id','start_shift_'+shiftName1)
	
			start_end_shift.appendChild(start_shift);
	
			const label_start_shift = document.createElement('label');
			label_start_shift.classList.add('label-shift');
	
			start_shift.appendChild(label_start_shift);
	
			const input_start_shift = document.createElement('input');
			input_start_shift.classList.add('input-shift');
			input_start_shift.type = 'datetime-local';
	
			start_shift.appendChild(input_start_shift);
	
			const end_shift = document.createElement('div');
			end_shift.classList.add('end-shift');
			end_shift.setAttribute('id','end_shift_'+shiftName1)
	
			start_end_shift.appendChild(end_shift);
	
			const label_end_shift = document.createElement('label');
			label_end_shift.classList.add('label-shift');
	
			end_shift.appendChild(label_end_shift);
	
			const input_end_shift = document.createElement('input');
			input_end_shift.classList.add('input-shift');
			input_end_shift.type = 'datetime-local';
	
			end_shift.appendChild(input_end_shift);  
			
			//HOURLY WAGE AND COMMENTS SECTION

			const hourlyWage = document.createElement('textarea');
			hourlyWage.classList.add('hourly-wage');
			hourlyWage.setAttribute('id','hourlyWage_'+shiftName1)
			hourlyWage.placeholder = 'Wage per day (€)'
			shift_content_el.appendChild(hourlyWage);

			const comments = document.createElement('textarea');
			comments.classList.add('comments');
			comments.setAttribute('id','comments_'+shiftName1)
			comments.placeholder = 'Comments';
			shift_content_el.appendChild(comments);
	
			//EDIT DELETE BUTTONS
			const shift_actions_el = document.createElement('div');
			shift_actions_el.classList.add('actions');
			
			const shift_edit_el = document.createElement('button');
			shift_edit_el.classList.add('edit');
			shift_edit_el.setAttribute('id', 'edit_btn_'+shiftName1);
			shift_edit_el.innerText = 'Edit';
	
			const shift_delete_el = document.createElement('button');
			shift_delete_el.classList.add('delete');
			shift_delete_el.setAttribute('id','delete_btn_'+shiftName1)
			shift_delete_el.innerText = 'Delete';


	
			shift_actions_el.appendChild(shift_edit_el);
			shift_actions_el.appendChild(shift_delete_el);
	
			shift_content_el.appendChild(shift_actions_el);
	
			list_el.appendChild(shift_el);
	
			input.value = '';
	
			shift_edit_el.addEventListener('click', (e) => {
				if (shift_edit_el.innerText.toLowerCase() == 'edit') {
					shift_edit_el.innerText = 'Update';
					shift_edit_el.removeAttribute('id','delete_btn_'+shiftName1);
					shift_edit_el.setAttribute('id', 'update_btn_'+shiftName1);
					shift_input_el.removeAttribute('readonly');
					hourlyWage.removeAttribute('readonly');
					comments.removeAttribute('readonly');
					shift_input_el.focus();

					} else {
						shift_edit_el.innerText = 'Edit';
						shift_edit_el.setAttribute('id', 'edit_btn_'+shiftName1);
						shift_input_el.setAttribute('readonly', 'readonly');
						}
			});


	
			shift_delete_el.addEventListener('click', (e) => {
				list_el.removeChild(shift_el);
				let shiftName2 = shift_el.getAttribute('id').split('_')[1];
				console.log(shift_el)
				let storage = {};

				for(let key in localStorage){
					let data = localStorage.getItem(key);
					data = JSON.parse(data);
			
				if(data){
					if(data.loggedOn){
						storage = data.shift;

						for(let element of storage){
							if(element.shiftName == shiftName2){
								Object.getOwnPropertyNames(element).forEach(function(prop){
									delete element[prop];
								})
								localStorage.setItem(data.username, JSON.stringify(data));
							}
						}
					}
				}
				}
			});

			let returnValues = {
				shift_input_el: shift_input_el.value,
				shift_slug: shift_slug.value,
				workplace: workplace.value,
				start_shift: start_shift.value,
				end_shift: end_shift.value,
				hourlyWage: hourlyWage.value,
				commentsValue: comments.value
			}
			return returnValues;
}

	form.addEventListener('click', (e) => {
		e.preventDefault();
		const shift = input.value;
	
		if(shift === ''){
			alert('input field cannot be empty');
		} else{
			let returnValues = createShiftSlug(shift,true);
			}
		});
		const saveBtn = document.querySelector('#save');

		saveBtn.addEventListener('click', (e) =>{
			e.preventDefault();
			let shiftSlug, workplace, startShift, endShift, hourlyWage, comments;
			let unique_name = '';	
			let contents = document.querySelectorAll('.content');
			let shiftName = '';

			for(let content of contents)
			{
			
				if(content.getAttribute('saved')=='false')
				{
						let first_element = content.querySelector('input');
						let name = first_element.getAttribute('id');
						let arr_name = name.split('_');
						unique_name = arr_name[1];
						shiftName = first_element.value;

						shiftSlug = content.querySelector('#slug_'+unique_name).value;
						workplace = content.querySelector('#workplace_'+unique_name).value;
						startShift = content.querySelector('#start_shift_'+unique_name).lastChild.value;
						endShift = content.querySelector('#end_shift_'+unique_name).lastChild.value;
						hourlyWage = content.querySelector('#hourlyWage_'+unique_name).value;
						comments = content.querySelector('#comments_'+unique_name).value;
				}
			}


			totalWage();
			
			const shiftName1 = shiftName;
			const shiftSlugValue = shiftSlug;
			const workplaceValue = workplace;
			const startShiftValue =startShift;
			const endShiftValue =endShift;
			const hourlyWageValue = hourlyWage;
			const commentsValue = comments;

			console.log(startShift)

			let storage = {};

			for(let key in localStorage){
				let data = localStorage.getItem(key);
				data = JSON.parse(data);// string in object
				// console.log(data);
		
			if(data){
				if(data.loggedOn){
					storage = data;
				}
			}
			}

			let shifts = [];

			if(storage.shift){
				shifts = storage.shift;
			}

			const myShift = {
				shiftName: '',
				shiftSlug: '',
				workplace: '',
				startShift: '',
				endShift: '',
				hourlyWage: '',
				comments: ''
			}
			console.log(startShiftValue);

			myShift.shiftName = shiftName1;
			myShift.shiftSlug = shiftSlugValue;
			myShift.workplace = workplaceValue;
			myShift.startShift = startShiftValue;
			myShift.endShift = endShiftValue;
			myShift.hourlyWage = hourlyWageValue;
			myShift.comments = commentsValue;

			shifts.push(myShift);

			storage.shift = shifts;

			console.log(myShift)

			localStorage.setItem(storage.username, JSON.stringify(storage));

		})

		//EDIT PROFILE FORM
		editProfileBtn.addEventListener('click', (e) => {
			editProfileForm.style.display = 'block';
			shiftEdit.style.display = 'none';
		})

		editProfileBtn.addEventListener('dblclick', (e) => {
			editProfileForm.style.display = 'none';
		})

		editProfileForm.addEventListener('submit', e =>{
			e.preventDefault();
			checkInputs();
		});

		function setSelectedValue(selectObj, valueToSet) {
			for (var i = 0; i < selectObj.options.length; i++) {
				if (selectObj.options[i].text == valueToSet) {
					selectObj.options[i].selected = true;
					return;
				}
			}
		}		


	//INPUT VALIDATION

		function checkInputs(){
    
			const editUserNameValue = editUserName.value.trim();
			const editFirstNameValue = editFirstName.value.trim();
			const editLastNameValue = editLastName.value.trim();
			const editAgeValue = editAge.value.trim();
			const editEmailValue = editEmail.value.trim();
			const editPasswordValue = editPassword.value.trim();
			const editConfirmPasswordValue = editConfirmPassword.value.trim();

			let editArrayValidation = [];
		
			if(editUserNameValue === ''){
				setErrorFor(editUserName, 'Field cannot be empty')
				editArrayValidation.push('false');
			} else if(editUserNameValue.length < 6){
				setErrorFor(editUserName, 'User name must have at least 6 characters long');
				editArrayValidation.push('false');
			} else if(!isUsername(editUserNameValue)){
				setErrorFor(editUserName, 'Use letters, numbers, special character');
				editArrayValidation.push('false');
			} else{
				setSuccessFor(editUserName);
				editArrayValidation.push('true');
			}
		
			if(editFirstNameValue === ''){
				setErrorFor(editFirstName, 'Field cannot be empty');
				editArrayValidation.push('false');
			} else if(editFirstNameValue.length < 2){
				setErrorFor(editFirstName, 'First name must have at least 2 constters');
				editArrayValidation.push('false');
			} else{
				setSuccessFor(editFirstName);
				editArrayValidation.push('true');
			}
		
			if(editLastNameValue === ''){
				setErrorFor(editLastName, 'Field cannot be empty');
				editArrayValidation.push('false');
			} else if(editLastNameValue.length < 2){
				setErrorFor(editLastName, 'Last name must have at least 2 constters');
				editArrayValidation.push('false');
			} else{
				setSuccessFor(editLastName);
				editArrayValidation.push('true');
			}
		
			if(editAgeValue === ''){
				setErrorFor(editAge, 'Field cannot be empty');
				editArrayValidation.push('false');
			} else if(editAgeValue < 18 || editAgeValue > 65){
				setErrorFor(editAge, "You don't fit within the editAge limit");
				editArrayValidation.push('false');
			} else{
				setSuccessFor(editAge);
				editArrayValidation.push('true');
			}
		
			if(editEmailValue === ''){
				setErrorFor(editEmail, 'Field cannot be empty')
				editArrayValidation.push('false');
			} else if(!isEmail(editEmailValue)){
				setErrorFor(editEmail, 'Invalid email');
				editArrayValidation.push('false');
			} else{
				setSuccessFor(editEmail);
				editArrayValidation.push('true');
			}
		
			if(editPasswordValue === ''){
				setErrorFor(editPassword, 'Field cannot be empty');
				editArrayValidation.push('false');
			} else if(editPasswordValue.length < 6){
				setErrorFor(editPassword, 'Password must have at least 6 characters long');
				editArrayValidation.push('false');
			} else if(!isPassword(editPasswordValue)){
				setErrorFor(editPassword, 'Use letters, numbers, special character');
				editArrayValidation.push('false');
			} else{
				setSuccessFor(editPassword);
				editArrayValidation.push('true');
			}
		
			if(editConfirmPasswordValue === ''){
				setErrorFor(editConfirmPassword, 'Field cannot be empty');
				editArrayValidation.push('false');
			} else if(editConfirmPasswordValue !== editPasswordValue){
				setErrorFor(editConfirmPassword, 'Must be the same as password');
				editArrayValidation.push('false');
			}else{
				setSuccessFor(editConfirmPassword);
				editArrayValidation.push('true');
			}
		
			const editArrayValidationCheck = editArrayValidation.every(element => element === 'true');


			//SAVING NEW INFORMATION TO LOCAL STORAGE

			if(editArrayValidationCheck === true){
				updateProfileBtn.addEventListener('click', () =>{
					for(let key in localStorage){
						let data = localStorage.getItem(key);
						data = JSON.parse(data);// string in object
						console.log(data);
				
					if(data){
						if(data.loggedOn){
							data.username = editUserName.value;
							data.firstName = editFirstName.value ;
							data.lastName = editLastName.value;
							data.age = editAge.value;
							data.email = editEmail.value;
							data.password = editPassword.value;
							data.editConfirmPassword = editConfirmPassword.value;

							localStorage.setItem(key, JSON.stringify(data));
							}
						}
					}
				})
			}
		}

		function setErrorFor(input, message) {
			const formControl = input.parentElement;
			const small = formControl.querySelector('small');
			formControl.className = 'form-control error';
			small.innerText = message;
		}

		function setSuccessFor(input) {
			const formControl = input.parentElement;
			formControl.className = 'form-control success';
		}

		function isUsername(userName){
			return /^((?=.*[a-z])(?=.*d)(?=.*[!@#$%^&*?/.])(?=.*[A-Z]).{6,16})/.test(userName);
		}
		
		function isPassword(password){
			return /^((?=.*[a-z])(?=.*d)(?=.*[!@#$%^&*?/.])(?=.*[A-Z]).{6,16})/.test(password);
		}		

		function isEmail(email) {
			return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		}

		//TOTAL WAGE
		function totalWage(wage){
			let arr = document.getElementsByClassName('hourly-wage');
			let sum = 0;
			for(let i = 0; i < arr.length; i++){
				if(parseInt(arr[i].value)){
					sum += parseInt(arr[i].value);
  				}
			}
			document.getElementById('total').value = sum;
		}

		//SEARCH
		const searchBtn = document.getElementById('search-btn');
		
		searchBtn.addEventListener('click', (e) =>{
			const searchInput = document.getElementById('search-input');
			const shifts = document.getElementById('shifts');

			shifts.innerHTML = '';

			for(let key in localStorage){
				let data = localStorage.getItem(key);
				data = JSON.parse(data);
		
			if(data){
				if(data.loggedOn){
					
				console.log(data);
					let shifts = data.shift;
					console.log(data.shift)
					for(let element of shifts){
						
						if(element.shiftName.includes(searchInput.value) || (element.startShift && element.startShift.includes(searchInput.value))){

						} else{
							Object.getOwnPropertyNames(element).forEach(function(prop){
								delete element[prop];
							})
					}
					}

					for(let shift of shifts){
						if(shift.shiftName){

						createShiftSlug(shift.shiftName, false);
		
						document.getElementById('comments_'+shift.shiftName).value = shift.comments;
						document.getElementById('hourlyWage_'+shift.shiftName).value = shift.hourlyWage;
		
						let shiftSlug2 = document.getElementById('slug_'+shift.shiftName);
						setSelectedValue(shiftSlug2, shift.shiftSlug);
		
						let workplace2 = document.getElementById('workplace_'+shift.shiftName);
						setSelectedValue(workplace2, shift.workplace);
		
						document.getElementById('start_shift_'+shift.shiftName).lastChild.value = shift.startShift;
						document.getElementById('end_shift_'+shift.shiftName).lastChild.value = shift.endShift;
						}
					}

				}
			}
		}
		})
});