import * as express from 'express';
import {User} from './../model/User';
import{ check, validationResult } from 'express-validator';
import validadToken from './../middleware/authentication';
import { Contact } from "./../model/Contacts";
 
const router = express.Router();

// @route           GET api/contacts
// @description     Get all contacts from the user
// @access          Private 

router.get('/', validadToken, async (req: any, res: any) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @route           POST api/contacts
// @description     Add a new contact for the user
// @access          Private

router.post('/', validadToken, [
    check('name', "Name is required").not().isEmpty()   
], async (req, res) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        // Add a contact with the basic fields and the ID user.
        const newContact = new Contact({ name, email, phone, type, user: req.user.id });

        const contact = await newContact.save();

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error"});
    }
})

// @route           PUT api/contacts
// @description     Get all contacts from the user
// @access          Private

router.put('/:id', validadToken, async (req: any, res: any) => {

    // The new data for the contact update...
    const { name, email, phone, type } = req.body;

    //  This is the new contact value after Update
    let contactField: any = {}
    if (name) contactField.name = name
    if (email) contactField.email = email
    if (phone) contactField.phone = phone
    if (type) contactField.type = type

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not found" })

        // Make sure that the User have the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactField },
            { new: true }
        )

        res.json(contact)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error "});
    }
})

// @route           DELETE api/contacts
// @description     Delete a contact
// @access          Private

router.delete('/:id', validadToken, async (req: any, res: any) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not found" })

        // Make sure that the User have the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: "Contact Remove"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error"});
    }
})

module.exports = router;
