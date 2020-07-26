<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Contact;
use Symfony\Component\Console\Input\Input;

class ContactController extends Controller
{

    public function index(Request $request)
    {
      $contacts = Contact::query();
      $filter =$request->input('filter');
      if($filter )
      {
          $contacts->where('name', 'like', $filter.'%')
              ->orWhere('phone', 'like', $filter.'%');
      }
        return $contacts->orderBy('id')
            ->limit(1000)->get();
    }

    public function show($id)
    {
        return Contact::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Contact::create($request->all());
    }

    public function update(Request $request, $id){
        $contact = Contact::findOrFail($id);
        $contact->update($request->all());
        return $contact;
    }
    public function delete($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return 204;
    }


}
