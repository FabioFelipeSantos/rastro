import boto3
import os
from dotenv import load_dotenv
import sys

load_dotenv()


def test_s3_connection():
    """Teste de conexão com o AWS S3"""
    try:
        aws_access_key = os.getenv("AWS_ACCESS_KEY_ID")
        aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        aws_bucket_name = os.getenv("AWS_STORAGE_BUCKET_NAME", "tweetclone")
        aws_region = os.getenv("AWS_S3_REGION_NAME", "us-east-1")

        if not aws_access_key or not aws_secret_key:
            print("ERRO: Credenciais AWS não encontradas no arquivo .env")
            return False

        print(f"Testando conexão com bucket: {aws_bucket_name}")
        print(f"Região: {aws_region}")

        s3 = boto3.client(
            "s3",
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=aws_region,
        )

        # Lista os buckets para testar a autenticação
        response = s3.list_buckets()
        buckets = [bucket["Name"] for bucket in response["Buckets"]]
        print(f"Buckets encontrados: {buckets}")

        if aws_bucket_name in buckets:
            print(f"✓ Bucket '{aws_bucket_name}' encontrado!")

            # Testa permissões de escrita criando um arquivo temporário
            test_content = b"Teste de conexao S3"
            test_key = "test_upload.txt"

            print(f"Testando upload para o bucket '{aws_bucket_name}'...")
            s3.put_object(
                Bucket=aws_bucket_name,
                Key=test_key,
                Body=test_content,
                ACL="public-read",
            )
            print(f"✓ Upload bem-sucedido!")

            # Limpa o arquivo de teste
            s3.delete_object(Bucket=aws_bucket_name, Key=test_key)
            print(f"✓ Teste concluído e arquivo de teste removido.")
            return True
        else:
            print(f"✗ Bucket '{aws_bucket_name}' não encontrado!")
            print(
                f"Verifique se o nome do bucket está correto e se você tem acesso a ele."
            )
            return False

    except Exception as e:
        print(f"ERRO ao testar conexão com S3: {str(e)}")
        return False


if __name__ == "__main__":
    success = test_s3_connection()
    sys.exit(0 if success else 1)
