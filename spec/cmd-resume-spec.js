describe('', function(){
	beforeEach(function(){
		this.$div = $(document.createElement('div'));
		this.term = this.$div.CMDResume('');
	});

	it('', function(){
		console.log(this.term.CMDResume.commands);
		expects(this.term.CMDResume.commands).toEqual('dog');
	});
});