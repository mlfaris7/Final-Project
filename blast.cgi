#!/usr/local/bin/python3

import cgi,json
import os
import cgitb
cgitb.enable()

def main():

	print("Content-Type:application/json\n\n")
	form = cgi.FieldStorage()

	#blast_db = /var/www/html/mfaris1/class_project/final_project/ncbi-blast-2.6.0+/db/uniprot_sprot
	#blast_query = /var/www/html/mfaris1/class_project/final_project/ncbi-blast-2.6.0+/db/temp.fasta

	#Need permission to write to the folder

	#with open('/var/www/html/mfaris1/class_project/final_project/ncbi-blast-2.6.0+/db/blast.txt', 'w') as fileOutput:
	 #      	fileOutput.write(form.blast_query)

	#Get the elements of the form
	#blast_query = form.getvalue("blast_query")
	#Run blastp 
	#for seq in blast_query:
	blast_results = list()
	blast = list()
    #	S = "blastp -db /var/www/html/mfaris1/class_project/final_project/ncbi-blast-2.6.0+/db/uniprot_sprot -query blast.txt -outfmt 6 -out result.out -num_threads 8 -max_target_seqs 3"
	S = "blastp -db /var/www/html/mfaris1/class_project/final_project/ncbi-blast-2.6.0+/db/uniprot_sprot -query /var/www/html/mfaris1/class_project/final_project/ncbi-blast-2.6.0+/db/temp.fasta -outfmt 6 -out result.out -max_target_seqs 10"  
	os.system(S)
	for line in open("result.out"):
		line.rstrip()
		cols= line.split()  
		if len(cols) == 12:
		  #blast_results = {'match_count':5, 'blast':list() }
		  blast_results.append({'query_id':cols[0],'subject_id': cols[1], 'p_identity' :cols[2], 'alignment':cols[3], 'length':cols[4], 'mismatches':cols[5],'gap_opens': cols[6], 'q_start':cols[7], 'q_end':cols[8], 's_start':cols[9], 's_end': cols[10], 'evalue':cols[11], 'bit_score':cols[11]})
		  #blast_results['match_count'] += 1
		   
	   
#Fields: query id, subject id, % identity, alignment length, mismatches, gap opens, q. start, q. end, s. start, s. end, evalue, bit score



	print(json.dumps(blast_results))

if __name__=='__main__':
	main()

