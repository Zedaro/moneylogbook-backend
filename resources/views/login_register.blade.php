<!DOCTYPE html>
<html>
<head>



</head>

<body>

<form method="post" action="/register">
    @csrf

    <label for="name">Name</label>
    <input type="text" name="name" value="Bob Bobsen">

    <label for="email">E-Mail</label>
    <input type="text" name="email" value="Bobsen24@Bob.com">

    <label for="password">Password</label>
    <input type="password" name="password" value="testtesttest">

    <label for="password_confirmation">Confirm Password</label>
    <input type="password" name="password_confirmation" value="testtesttest">

    <button type="submit">Submit</button>

</form>


@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

</body>
</html>
