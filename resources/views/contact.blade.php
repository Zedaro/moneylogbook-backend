@extends('layouts.app')

@section('content')

    {{--@include()--}}

    <h1>Contact Page.   id: {{ $id }},   name: {{ $name }}</h1>

    @if (count($contacts))
        @foreach($contacts as $contact)
            <ul>
                <li>{{ $contact }}</li>
            </ul>
        @endforeach
    @endif

@endsection

@section('footer')

    <script>
        //alert("Alert!");
    </script>

@endsection
